import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IHome } from 'app/shared/model/home.model';
import { getEntities as getHomes } from 'app/entities/home/home.reducer';
import { IDevice } from 'app/shared/model/device.model';
import { getEntity, updateEntity, createEntity, reset } from './device.reducer';

export const DeviceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const homes = useAppSelector(state => state.home.entities);
  const deviceEntity = useAppSelector(state => state.device.entity);
  const loading = useAppSelector(state => state.device.loading);
  const updating = useAppSelector(state => state.device.updating);
  const updateSuccess = useAppSelector(state => state.device.updateSuccess);

  const handleClose = () => {
    navigate('/device');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getHomes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...deviceEntity,
      ...values,
      home: homes.find(it => it.id.toString() === values.home.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...deviceEntity,
          home: deviceEntity?.home?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="xAdminApp.device.home.createOrEditLabel" data-cy="DeviceCreateUpdateHeading">
            <Translate contentKey="xAdminApp.device.home.createOrEditLabel">Create or edit a Device</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="device-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('xAdminApp.device.deviceID')}
                id="device-deviceID"
                name="deviceID"
                data-cy="deviceID"
                type="text"
              />
              <ValidatedField
                label={translate('xAdminApp.device.deviceName')}
                id="device-deviceName"
                name="deviceName"
                data-cy="deviceName"
                type="text"
              />
              <ValidatedField
                label={translate('xAdminApp.device.deviceType')}
                id="device-deviceType"
                name="deviceType"
                data-cy="deviceType"
                type="text"
              />
              <ValidatedField
                label={translate('xAdminApp.device.deviceDesc')}
                id="device-deviceDesc"
                name="deviceDesc"
                data-cy="deviceDesc"
                type="text"
              />
              <ValidatedField
                label={translate('xAdminApp.device.deviceStatus')}
                id="device-deviceStatus"
                name="deviceStatus"
                data-cy="deviceStatus"
                type="text"
              />
              <ValidatedField
                label={translate('xAdminApp.device.mqttServerName')}
                id="device-mqttServerName"
                name="mqttServerName"
                data-cy="mqttServerName"
                type="text"
              />
              <ValidatedField
                label={translate('xAdminApp.device.mqttServerTopic')}
                id="device-mqttServerTopic"
                name="mqttServerTopic"
                data-cy="mqttServerTopic"
                type="text"
              />
              <ValidatedField id="device-home" name="home" data-cy="home" label={translate('xAdminApp.device.home')} type="select">
                <option value="" key="0" />
                {homes
                  ? homes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/device" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DeviceUpdate;
