package com.volgait.statisticmanager.server.service.user.impl;

import com.volgait.statisticmanager.server.model.entity.User;
import com.volgait.statisticmanager.server.model.entity.VerificationToken;
import com.volgait.statisticmanager.server.model.form.RegistrationForm;
import com.volgait.statisticmanager.server.repository.UserRepository;
import com.volgait.statisticmanager.server.repository.VerificationTokenRepository;
import com.volgait.statisticmanager.server.service.security.SecurityService;
import com.volgait.statisticmanager.server.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    private HttpServletRequest httpServletRequest;
    @Autowired
    private HttpServletResponse httpServletResponse;
    @Autowired
    UserRepository userRepository;
    @Autowired
    VerificationTokenRepository verificationTokenRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    SecurityService securityService;

    @Override
    public ServiceResponse login(User requestUser) {
        UsernamePasswordAuthenticationToken authenticationTokenRequest = new
                UsernamePasswordAuthenticationToken(requestUser.getUsername(), requestUser.getPassword());
        try {
            Authentication authentication = this.authenticationManager.authenticate(authenticationTokenRequest);
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);

            User user = (User) authentication.getPrincipal();
            LOG.info("Logged in user: {}", user);
            return new ServiceResponse(HttpStatus.OK, MessageServiceResponse.OK, user);

        } catch (BadCredentialsException ex) {
            return new ServiceResponse(HttpStatus.BAD_REQUEST, MessageServiceResponse.NO_USER_WITH_USERNAME);
        }
    }

    @Override
    public ServiceResponse logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(
                    httpServletRequest,
                    httpServletResponse,
                    authentication);
        }
        return new ServiceResponse(HttpStatus.OK, MessageServiceResponse.OK);
    }

    @Override
    public ServiceResponse register(RegistrationForm form) {
        ServiceResponse response = new ServiceResponse();
        if (!form.getPassword().equals(form.getConfirmPassword())) {
            response.setResponseMessage(MessageServiceResponse.NEW_PASSWORD_MISMATCHED);
            response.setResponseCode(HttpStatus.BAD_REQUEST);
            return response;
        }

        User user = form.toUser(bCryptPasswordEncoder);
        if (userRepository.findByUsername(user.getUsername()) != null) {
            response.setResponseMessage(MessageServiceResponse.USER_USERNAME_ALREADY_EXIST);
            response.setResponseCode(HttpStatus.BAD_REQUEST);
            return response;
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            response.setResponseMessage(MessageServiceResponse.USER_EMAIL_ALREADY_EXIST);
            response.setResponseCode(HttpStatus.BAD_REQUEST);
            return response;
        }
        String securityToken = securityService.generateSecurityToken();

        VerificationToken verificationToken = new VerificationToken(securityToken, user);
        try {
            userRepository.save(user);
            verificationTokenRepository.save(verificationToken);
            response.setSuccessResponse();
        } catch (UnexpectedRollbackException e) {
            e.printStackTrace();
            response.setInternalServerErrorResponse();
        } catch (Exception e) {
            response.setInternalServerErrorResponse();
        }
        return response;
    }

    @Override
    public boolean activateAccount(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken == null) {
            return false;
        }
        User account = verificationToken.getUser();
        userRepository.save(account);
        verificationTokenRepository.save(verificationToken);
        return true;
    }
}
