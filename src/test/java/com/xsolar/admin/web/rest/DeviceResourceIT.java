package com.xsolar.admin.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.xsolar.admin.IntegrationTest;
import com.xsolar.admin.domain.Device;
import com.xsolar.admin.repository.DeviceRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DeviceResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DeviceResourceIT {

    private static final String DEFAULT_DEVICE_ID = "AAAAAAAAAA";
    private static final String UPDATED_DEVICE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_DEVICE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DEVICE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DEVICE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DEVICE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DEVICE_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DEVICE_DESC = "BBBBBBBBBB";

    private static final String DEFAULT_DEVICE_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_DEVICE_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_MQTT_SERVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MQTT_SERVER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MQTT_SERVER_TOPIC = "AAAAAAAAAA";
    private static final String UPDATED_MQTT_SERVER_TOPIC = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/devices";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDeviceMockMvc;

    private Device device;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Device createEntity(EntityManager em) {
        Device device = new Device()
            .deviceID(DEFAULT_DEVICE_ID)
            .deviceName(DEFAULT_DEVICE_NAME)
            .deviceType(DEFAULT_DEVICE_TYPE)
            .deviceDesc(DEFAULT_DEVICE_DESC)
            .deviceStatus(DEFAULT_DEVICE_STATUS)
            .mqttServerName(DEFAULT_MQTT_SERVER_NAME)
            .mqttServerTopic(DEFAULT_MQTT_SERVER_TOPIC);
        return device;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Device createUpdatedEntity(EntityManager em) {
        Device device = new Device()
            .deviceID(UPDATED_DEVICE_ID)
            .deviceName(UPDATED_DEVICE_NAME)
            .deviceType(UPDATED_DEVICE_TYPE)
            .deviceDesc(UPDATED_DEVICE_DESC)
            .deviceStatus(UPDATED_DEVICE_STATUS)
            .mqttServerName(UPDATED_MQTT_SERVER_NAME)
            .mqttServerTopic(UPDATED_MQTT_SERVER_TOPIC);
        return device;
    }

    @BeforeEach
    public void initTest() {
        device = createEntity(em);
    }

    @Test
    @Transactional
    void createDevice() throws Exception {
        int databaseSizeBeforeCreate = deviceRepository.findAll().size();
        // Create the Device
        restDeviceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isCreated());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeCreate + 1);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getDeviceID()).isEqualTo(DEFAULT_DEVICE_ID);
        assertThat(testDevice.getDeviceName()).isEqualTo(DEFAULT_DEVICE_NAME);
        assertThat(testDevice.getDeviceType()).isEqualTo(DEFAULT_DEVICE_TYPE);
        assertThat(testDevice.getDeviceDesc()).isEqualTo(DEFAULT_DEVICE_DESC);
        assertThat(testDevice.getDeviceStatus()).isEqualTo(DEFAULT_DEVICE_STATUS);
        assertThat(testDevice.getMqttServerName()).isEqualTo(DEFAULT_MQTT_SERVER_NAME);
        assertThat(testDevice.getMqttServerTopic()).isEqualTo(DEFAULT_MQTT_SERVER_TOPIC);
    }

    @Test
    @Transactional
    void createDeviceWithExistingId() throws Exception {
        // Create the Device with an existing ID
        device.setId(1L);

        int databaseSizeBeforeCreate = deviceRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeviceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isBadRequest());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDevices() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        // Get all the deviceList
        restDeviceMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(device.getId().intValue())))
            .andExpect(jsonPath("$.[*].deviceID").value(hasItem(DEFAULT_DEVICE_ID)))
            .andExpect(jsonPath("$.[*].deviceName").value(hasItem(DEFAULT_DEVICE_NAME)))
            .andExpect(jsonPath("$.[*].deviceType").value(hasItem(DEFAULT_DEVICE_TYPE)))
            .andExpect(jsonPath("$.[*].deviceDesc").value(hasItem(DEFAULT_DEVICE_DESC)))
            .andExpect(jsonPath("$.[*].deviceStatus").value(hasItem(DEFAULT_DEVICE_STATUS)))
            .andExpect(jsonPath("$.[*].mqttServerName").value(hasItem(DEFAULT_MQTT_SERVER_NAME)))
            .andExpect(jsonPath("$.[*].mqttServerTopic").value(hasItem(DEFAULT_MQTT_SERVER_TOPIC)));
    }

    @Test
    @Transactional
    void getDevice() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        // Get the device
        restDeviceMockMvc
            .perform(get(ENTITY_API_URL_ID, device.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(device.getId().intValue()))
            .andExpect(jsonPath("$.deviceID").value(DEFAULT_DEVICE_ID))
            .andExpect(jsonPath("$.deviceName").value(DEFAULT_DEVICE_NAME))
            .andExpect(jsonPath("$.deviceType").value(DEFAULT_DEVICE_TYPE))
            .andExpect(jsonPath("$.deviceDesc").value(DEFAULT_DEVICE_DESC))
            .andExpect(jsonPath("$.deviceStatus").value(DEFAULT_DEVICE_STATUS))
            .andExpect(jsonPath("$.mqttServerName").value(DEFAULT_MQTT_SERVER_NAME))
            .andExpect(jsonPath("$.mqttServerTopic").value(DEFAULT_MQTT_SERVER_TOPIC));
    }

    @Test
    @Transactional
    void getNonExistingDevice() throws Exception {
        // Get the device
        restDeviceMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDevice() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();

        // Update the device
        Device updatedDevice = deviceRepository.findById(device.getId()).get();
        // Disconnect from session so that the updates on updatedDevice are not directly saved in db
        em.detach(updatedDevice);
        updatedDevice
            .deviceID(UPDATED_DEVICE_ID)
            .deviceName(UPDATED_DEVICE_NAME)
            .deviceType(UPDATED_DEVICE_TYPE)
            .deviceDesc(UPDATED_DEVICE_DESC)
            .deviceStatus(UPDATED_DEVICE_STATUS)
            .mqttServerName(UPDATED_MQTT_SERVER_NAME)
            .mqttServerTopic(UPDATED_MQTT_SERVER_TOPIC);

        restDeviceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDevice.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDevice))
            )
            .andExpect(status().isOk());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getDeviceID()).isEqualTo(UPDATED_DEVICE_ID);
        assertThat(testDevice.getDeviceName()).isEqualTo(UPDATED_DEVICE_NAME);
        assertThat(testDevice.getDeviceType()).isEqualTo(UPDATED_DEVICE_TYPE);
        assertThat(testDevice.getDeviceDesc()).isEqualTo(UPDATED_DEVICE_DESC);
        assertThat(testDevice.getDeviceStatus()).isEqualTo(UPDATED_DEVICE_STATUS);
        assertThat(testDevice.getMqttServerName()).isEqualTo(UPDATED_MQTT_SERVER_NAME);
        assertThat(testDevice.getMqttServerTopic()).isEqualTo(UPDATED_MQTT_SERVER_TOPIC);
    }

    @Test
    @Transactional
    void putNonExistingDevice() throws Exception {
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();
        device.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeviceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, device.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(device))
            )
            .andExpect(status().isBadRequest());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDevice() throws Exception {
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();
        device.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeviceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(device))
            )
            .andExpect(status().isBadRequest());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDevice() throws Exception {
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();
        device.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeviceMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDeviceWithPatch() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();

        // Update the device using partial update
        Device partialUpdatedDevice = new Device();
        partialUpdatedDevice.setId(device.getId());

        partialUpdatedDevice
            .deviceDesc(UPDATED_DEVICE_DESC)
            .deviceStatus(UPDATED_DEVICE_STATUS)
            .mqttServerName(UPDATED_MQTT_SERVER_NAME)
            .mqttServerTopic(UPDATED_MQTT_SERVER_TOPIC);

        restDeviceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDevice.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDevice))
            )
            .andExpect(status().isOk());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getDeviceID()).isEqualTo(DEFAULT_DEVICE_ID);
        assertThat(testDevice.getDeviceName()).isEqualTo(DEFAULT_DEVICE_NAME);
        assertThat(testDevice.getDeviceType()).isEqualTo(DEFAULT_DEVICE_TYPE);
        assertThat(testDevice.getDeviceDesc()).isEqualTo(UPDATED_DEVICE_DESC);
        assertThat(testDevice.getDeviceStatus()).isEqualTo(UPDATED_DEVICE_STATUS);
        assertThat(testDevice.getMqttServerName()).isEqualTo(UPDATED_MQTT_SERVER_NAME);
        assertThat(testDevice.getMqttServerTopic()).isEqualTo(UPDATED_MQTT_SERVER_TOPIC);
    }

    @Test
    @Transactional
    void fullUpdateDeviceWithPatch() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();

        // Update the device using partial update
        Device partialUpdatedDevice = new Device();
        partialUpdatedDevice.setId(device.getId());

        partialUpdatedDevice
            .deviceID(UPDATED_DEVICE_ID)
            .deviceName(UPDATED_DEVICE_NAME)
            .deviceType(UPDATED_DEVICE_TYPE)
            .deviceDesc(UPDATED_DEVICE_DESC)
            .deviceStatus(UPDATED_DEVICE_STATUS)
            .mqttServerName(UPDATED_MQTT_SERVER_NAME)
            .mqttServerTopic(UPDATED_MQTT_SERVER_TOPIC);

        restDeviceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDevice.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDevice))
            )
            .andExpect(status().isOk());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getDeviceID()).isEqualTo(UPDATED_DEVICE_ID);
        assertThat(testDevice.getDeviceName()).isEqualTo(UPDATED_DEVICE_NAME);
        assertThat(testDevice.getDeviceType()).isEqualTo(UPDATED_DEVICE_TYPE);
        assertThat(testDevice.getDeviceDesc()).isEqualTo(UPDATED_DEVICE_DESC);
        assertThat(testDevice.getDeviceStatus()).isEqualTo(UPDATED_DEVICE_STATUS);
        assertThat(testDevice.getMqttServerName()).isEqualTo(UPDATED_MQTT_SERVER_NAME);
        assertThat(testDevice.getMqttServerTopic()).isEqualTo(UPDATED_MQTT_SERVER_TOPIC);
    }

    @Test
    @Transactional
    void patchNonExistingDevice() throws Exception {
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();
        device.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeviceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, device.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(device))
            )
            .andExpect(status().isBadRequest());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDevice() throws Exception {
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();
        device.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeviceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(device))
            )
            .andExpect(status().isBadRequest());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDevice() throws Exception {
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();
        device.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeviceMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDevice() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        int databaseSizeBeforeDelete = deviceRepository.findAll().size();

        // Delete the device
        restDeviceMockMvc
            .perform(delete(ENTITY_API_URL_ID, device.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
