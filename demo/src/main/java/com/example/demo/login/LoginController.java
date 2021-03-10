package com.example.demo.login;

import com.example.demo.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/login")
@AllArgsConstructor
public class LoginController {

  @RequestMapping("/user")
  public AppUser user(AppUser user) {
    return user;
  }

}
