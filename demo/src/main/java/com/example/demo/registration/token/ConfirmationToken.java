package com.example.demo.registration.token;

import com.example.demo.appuser.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ConfirmationToken {

  @SequenceGenerator(
      name= "confirmation_sequence",
      sequenceName = "confirmation_sequence",
      allocationSize = 1
  )
  @Id
  @GeneratedValue(
      strategy = GenerationType.SEQUENCE,
      generator = "confirmation_sequence"
  )
  private Long id;
  @Column(nullable = false)
  private String token;

  @Column(nullable = false)
  private LocalDateTime createdAt;

  @Column(nullable = false)
  private LocalDateTime expiresAt;

  private LocalDateTime confirmedAt;

  @ManyToOne
  @JoinColumn(
      nullable = false,
      name = "app_user_id"
  )
  private AppUser appUser;

  public ConfirmationToken(String token,
                           LocalDateTime createdAt,
                           LocalDateTime expiresAt,
                           AppUser appUser) {
    this.token = token;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    this.confirmedAt = confirmedAt;
    this.appUser = appUser;
  }
}
