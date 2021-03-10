package com.example.demo.login;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.dto.ResponseData;
import com.example.demo.registration.LoginRequest;
import lombok.AllArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@AllArgsConstructor
public class LoginService {

  private DaoAuthenticationProvider authenticationManager;
  private final AppUserService appUserService;
  private static final Logger LOGGER = LoggerFactory.getLogger(AppUserService.class);

  public ResponseData login(@RequestBody LoginRequest loginRequest, HttpServletResponse httpServletResponse, HttpServletRequest request) {
    ResponseData result = new ResponseData("500", "Login Falhou");
    if (loginRequest.getPassword() != null && loginRequest.getEmail() != null){
      AppUser appUser = null;
      try{
        appUser = appUserService.signIn(loginRequest.getEmail());
      } catch(ServiceException e){
        LOGGER.error("Erro ao fazer o login", e.toString());
      }
      if(appUser != null){
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        if (authentication.isAuthenticated()) {
          try {
            appUserService.updateStatusLoggedIn(appUser);
          } catch (ServiceException e) {
            LOGGER.error("Error update status logged in : {}", e.toString());
          }
          SecurityContextHolder.getContext().setAuthentication(authentication);
          result = new ResponseData("200", "Login Success");
        }
        else {
          LOGGER.info("User Not Found");
          result = new ResponseData("500", "User Not Exist");
        }
      }
      else {
        LOGGER.error("Missing Login Body Request");
      }
    }
    return result;
  }

}
