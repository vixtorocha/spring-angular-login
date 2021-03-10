package com.example.demo.registration;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.appuser.Role;
import com.example.demo.dto.ResponseData;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class RegistrationService {

  private final AppUserService appUserService;
  private final EmailValidator emailValidator;

  @Transactional
  public ResponseEntity register(RegistrationRequest request) {
    boolean isValidEmail = emailValidator.test(request.getEmail());
    if(!isValidEmail) {
//      throw new IllegalStateException("email não válido");
      return ResponseEntity.ok(new ResponseData("400", "Email já cadastrado"));
    }
    appUserService.singUpUser(
        new AppUser(
            request.getFirstName(),
            request.getLastName(),
            request.getEmail(),
            request.getPassword(),
            Role.USER
        )
    );

    return ResponseEntity.ok(new ResponseData("200", "Usuário cadastrado"));
  }
}
