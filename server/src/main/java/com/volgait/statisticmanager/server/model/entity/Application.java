package com.volgait.statisticmanager.server.model.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "sw_application")
public class Application implements Serializable {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Long applicationId;

    @Getter
    @Setter
    @NotNull
    @Column(name = "name")
    private String name;

    @Getter
    @Setter
    @NotNull
    @Column(name = "creation_date")
    private Date creationDate;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "user_user_id")
    @NotNull
    private User user;
}
