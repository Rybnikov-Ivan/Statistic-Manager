package com.volgait.statisticmanager.server.controller;

import com.volgait.statisticmanager.server.model.entity.User;
import com.volgait.statisticmanager.server.model.form.RegistrationForm;
import com.volgait.statisticmanager.server.service.user.UserService;
import com.volgait.statisticmanager.server.service.user.impl.ServiceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

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

    @ResponseBody
    @PostMapping(value = "/register")
    public ServiceResponse processRegistration(@RequestBody RegistrationForm form) {
        return userService.register(form);
    }

}
