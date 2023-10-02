package com.xsolar.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Home.
 */
@Entity
@Table(name = "home")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Home implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "home_id")
    private String homeId;

    @Column(name = "home_desc")
    private String homeDesc;

    @Column(name = "home_address")
    private String homeAddress;

    @Column(name = "last_update")
    private String lastUpdate;

    @OneToMany(mappedBy = "home")
    @JsonIgnoreProperties(value = { "home" }, allowSetters = true)
    private Set<Device> devices = new HashSet<>();

    @OneToMany(mappedBy = "home")
    @JsonIgnoreProperties(value = { "home" }, allowSetters = true)
    private Set<Location> locations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Home id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHomeId() {
        return this.homeId;
    }

    public Home homeId(String homeId) {
        this.setHomeId(homeId);
        return this;
    }

    public void setHomeId(String homeId) {
        this.homeId = homeId;
    }

    public String getHomeDesc() {
        return this.homeDesc;
    }

    public Home homeDesc(String homeDesc) {
        this.setHomeDesc(homeDesc);
        return this;
    }

    public void setHomeDesc(String homeDesc) {
        this.homeDesc = homeDesc;
    }

    public String getHomeAddress() {
        return this.homeAddress;
    }

    public Home homeAddress(String homeAddress) {
        this.setHomeAddress(homeAddress);
        return this;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }

    public String getLastUpdate() {
        return this.lastUpdate;
    }

    public Home lastUpdate(String lastUpdate) {
        this.setLastUpdate(lastUpdate);
        return this;
    }

    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Set<Device> getDevices() {
        return this.devices;
    }

    public void setDevices(Set<Device> devices) {
        if (this.devices != null) {
            this.devices.forEach(i -> i.setHome(null));
        }
        if (devices != null) {
            devices.forEach(i -> i.setHome(this));
        }
        this.devices = devices;
    }

    public Home devices(Set<Device> devices) {
        this.setDevices(devices);
        return this;
    }

    public Home addDevice(Device device) {
        this.devices.add(device);
        device.setHome(this);
        return this;
    }

    public Home removeDevice(Device device) {
        this.devices.remove(device);
        device.setHome(null);
        return this;
    }

    public Set<Location> getLocations() {
        return this.locations;
    }

    public void setLocations(Set<Location> locations) {
        if (this.locations != null) {
            this.locations.forEach(i -> i.setHome(null));
        }
        if (locations != null) {
            locations.forEach(i -> i.setHome(this));
        }
        this.locations = locations;
    }

    public Home locations(Set<Location> locations) {
        this.setLocations(locations);
        return this;
    }

    public Home addLocation(Location location) {
        this.locations.add(location);
        location.setHome(this);
        return this;
    }

    public Home removeLocation(Location location) {
        this.locations.remove(location);
        location.setHome(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Home)) {
            return false;
        }
        return id != null && id.equals(((Home) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Home{" +
            "id=" + getId() +
            ", homeId='" + getHomeId() + "'" +
            ", homeDesc='" + getHomeDesc() + "'" +
            ", homeAddress='" + getHomeAddress() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            "}";
    }
}
