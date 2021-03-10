package com.example.demo.appuser;

import lombok.AllArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

  private final static String USER_NOT_FOUND_MSG = "Usuário não encontrado";
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  private static final Logger LOGGER = LoggerFactory.getLogger(AppUserService.class);

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG)));
  }

  public AppUser singUpUser(AppUser appUser){
    boolean userExists = userRepository.findByEmail((appUser.getEmail())).isPresent();

    if(userExists){
      throw new IllegalStateException("email já existe");
    }

    String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
    appUser.setPassword(encodedPassword);

    userRepository.save(appUser);
    return appUser;
  }

  public void updateStatusLoggedIn(AppUser user) throws ServiceException {
    user.setLastLogin(new Date());
    user.setLoginStatus(Boolean.TRUE);
    userRepository.save(user);
  }

  public AppUser signIn(String email) throws ServiceException {
    AppUser user = null;
    try {
      user = userRepository.findAppUserByEmail(email);
    } catch (Exception e) {
      LOGGER.error("Error Searching User By UserName or PhoneNumber of Email {}", e.toString());
    }
    if(user != null) {
      LOGGER.debug("Usuário encontrado: ", user.getEmail());
      return user;
    }else {
      LOGGER.warn("User Not Found");
      return null;
    }
  }
}
