package com.volgait.statisticmanager.server.controller;

import com.volgait.statisticmanager.server.model.entity.User;
import com.volgait.statisticmanager.server.model.form.RegistrationForm;
import com.volgait.statisticmanager.server.service.user.UserService;
import com.volgait.statisticmanager.server.service.user.impl.ServiceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);
    @Value( "${client.url}" )
    private String clientUrl;

    @Autowired
    UserService userService;

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }

    @PostMapping(value = "/login")
    @ResponseBody
    public ServiceResponse processLogin(@RequestBody User requestUser) {
        return userService.login(requestUser);
    }

    @GetMapping(value = "/logout")
    @ResponseBody
    public ServiceResponse processLogout() {
        return userService.logout();
    }

    @PostMapping(value = "/register")
    @ResponseBody
    public ServiceResponse processRegistration(@RequestBody RegistrationForm form) {
        return userService.register(form);
    }

    @GetMapping(value = "/confirm/{securityToken}")
    public RedirectView confirmRegistration(@PathVariable("securityToken") String securityToken) {
        LOG.info("Security token from email: " + securityToken);
        boolean isUserActivated = userService.activateAccount(securityToken);
        if(isUserActivated) {
            return new RedirectView(clientUrl + "/login");
        }
        else {
            return new RedirectView(clientUrl + "/not-found");
        }
    }

}
