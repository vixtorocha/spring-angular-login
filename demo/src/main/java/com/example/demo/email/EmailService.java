package com.example.demo.email;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@AllArgsConstructor
public class EmailService implements EmailSender{

  private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
  private final JavaMailSender javaMailSender;

  @Override
  @Async
  public void send(String to, String email) {
    try {
      MimeMessage mimeMessage = javaMailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
      helper.setText(email, true);
      helper.setTo(to);
      helper.setSubject("Confirme o seu email");
      helper.setFrom("joaobrvictor@gmail.com");
    } catch (MessagingException e) {
      throw new IllegalStateException("falhou ao enviar email");
    }
  }
}
