package com.volgait.statisticmanager.server.model.form;

import com.volgait.statisticmanager.server.model.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
public class RegistrationForm {
    private String username;
    private String email;
    private String password;
    private String confirmPassword;

    public RegistrationForm() {
    }

    public RegistrationForm(String username, String password, String matchingPassword, String email) {
        this.username = username;
        this.password = password;
        this.confirmPassword = matchingPassword;
        this.email = email;
    }

    public User toUser(PasswordEncoder passwordEncoder) {
        return new User(username, passwordEncoder.encode(password), email);
    }
}
