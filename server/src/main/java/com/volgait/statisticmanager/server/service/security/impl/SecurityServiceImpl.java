package com.volgait.statisticmanager.server.service.security.impl;

import com.volgait.statisticmanager.server.service.security.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@Service
public class SecurityServiceImpl implements SecurityService {

    private static final Logger LOG = LoggerFactory.getLogger(SecurityServiceImpl.class);

    @Override
    public String generateSecurityToken() {
        String token = "";
        try {
            SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
            token = String.valueOf(sr.nextInt(Integer.MAX_VALUE));
        } catch (NoSuchAlgorithmException e) {
            LOG.error("Error while generating security token.");
            e.printStackTrace();
        }
        return token;
    }
}
