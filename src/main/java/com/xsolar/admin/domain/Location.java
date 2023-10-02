package com.xsolar.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Location.
 */
@Entity
@Table(name = "location")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "loc_id")
    private String locID;

    @Column(name = "loc_name")
    private String locName;

    @Column(name = "loc_desc")
    private String locDesc;

    @ManyToOne
    @JsonIgnoreProperties(value = { "devices", "locations" }, allowSetters = true)
    private Home home;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Location id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocID() {
        return this.locID;
    }

    public Location locID(String locID) {
        this.setLocID(locID);
        return this;
    }

    public void setLocID(String locID) {
        this.locID = locID;
    }

    public String getLocName() {
        return this.locName;
    }

    public Location locName(String locName) {
        this.setLocName(locName);
        return this;
    }

    public void setLocName(String locName) {
        this.locName = locName;
    }

    public String getLocDesc() {
        return this.locDesc;
    }

    public Location locDesc(String locDesc) {
        this.setLocDesc(locDesc);
        return this;
    }

    public void setLocDesc(String locDesc) {
        this.locDesc = locDesc;
    }

    public Home getHome() {
        return this.home;
    }

    public void setHome(Home home) {
        this.home = home;
    }

    public Location home(Home home) {
        this.setHome(home);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Location)) {
            return false;
        }
        return id != null && id.equals(((Location) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", locID='" + getLocID() + "'" +
            ", locName='" + getLocName() + "'" +
            ", locDesc='" + getLocDesc() + "'" +
            "}";
    }
}
