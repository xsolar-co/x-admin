package com.xsolar.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Device.
 */
@Entity
@Table(name = "device")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Device implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "device_id")
    private String deviceID;

    @Column(name = "device_name")
    private String deviceName;

    @Column(name = "device_type")
    private String deviceType;

    @Column(name = "device_desc")
    private String deviceDesc;

    @Column(name = "device_status")
    private String deviceStatus;

    @Column(name = "mqtt_server_name")
    private String mqttServerName;

    @Column(name = "mqtt_server_topic")
    private String mqttServerTopic;

    @ManyToOne
    @JsonIgnoreProperties(value = { "devices", "locations" }, allowSetters = true)
    private Home home;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Device id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeviceID() {
        return this.deviceID;
    }

    public Device deviceID(String deviceID) {
        this.setDeviceID(deviceID);
        return this;
    }

    public void setDeviceID(String deviceID) {
        this.deviceID = deviceID;
    }

    public String getDeviceName() {
        return this.deviceName;
    }

    public Device deviceName(String deviceName) {
        this.setDeviceName(deviceName);
        return this;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceType() {
        return this.deviceType;
    }

    public Device deviceType(String deviceType) {
        this.setDeviceType(deviceType);
        return this;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getDeviceDesc() {
        return this.deviceDesc;
    }

    public Device deviceDesc(String deviceDesc) {
        this.setDeviceDesc(deviceDesc);
        return this;
    }

    public void setDeviceDesc(String deviceDesc) {
        this.deviceDesc = deviceDesc;
    }

    public String getDeviceStatus() {
        return this.deviceStatus;
    }

    public Device deviceStatus(String deviceStatus) {
        this.setDeviceStatus(deviceStatus);
        return this;
    }

    public void setDeviceStatus(String deviceStatus) {
        this.deviceStatus = deviceStatus;
    }

    public String getMqttServerName() {
        return this.mqttServerName;
    }

    public Device mqttServerName(String mqttServerName) {
        this.setMqttServerName(mqttServerName);
        return this;
    }

    public void setMqttServerName(String mqttServerName) {
        this.mqttServerName = mqttServerName;
    }

    public String getMqttServerTopic() {
        return this.mqttServerTopic;
    }

    public Device mqttServerTopic(String mqttServerTopic) {
        this.setMqttServerTopic(mqttServerTopic);
        return this;
    }

    public void setMqttServerTopic(String mqttServerTopic) {
        this.mqttServerTopic = mqttServerTopic;
    }

    public Home getHome() {
        return this.home;
    }

    public void setHome(Home home) {
        this.home = home;
    }

    public Device home(Home home) {
        this.setHome(home);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Device)) {
            return false;
        }
        return id != null && id.equals(((Device) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Device{" +
            "id=" + getId() +
            ", deviceID='" + getDeviceID() + "'" +
            ", deviceName='" + getDeviceName() + "'" +
            ", deviceType='" + getDeviceType() + "'" +
            ", deviceDesc='" + getDeviceDesc() + "'" +
            ", deviceStatus='" + getDeviceStatus() + "'" +
            ", mqttServerName='" + getMqttServerName() + "'" +
            ", mqttServerTopic='" + getMqttServerTopic() + "'" +
            "}";
    }
}
