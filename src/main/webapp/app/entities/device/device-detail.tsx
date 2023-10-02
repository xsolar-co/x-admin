import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './device.reducer';

export const DeviceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const deviceEntity = useAppSelector(state => state.device.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="deviceDetailsHeading">
          <Translate contentKey="xAdminApp.device.detail.title">Device</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.id}</dd>
          <dt>
            <span id="deviceID">
              <Translate contentKey="xAdminApp.device.deviceID">Device ID</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.deviceID}</dd>
          <dt>
            <span id="deviceName">
              <Translate contentKey="xAdminApp.device.deviceName">Device Name</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.deviceName}</dd>
          <dt>
            <span id="deviceType">
              <Translate contentKey="xAdminApp.device.deviceType">Device Type</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.deviceType}</dd>
          <dt>
            <span id="deviceDesc">
              <Translate contentKey="xAdminApp.device.deviceDesc">Device Desc</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.deviceDesc}</dd>
          <dt>
            <span id="deviceStatus">
              <Translate contentKey="xAdminApp.device.deviceStatus">Device Status</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.deviceStatus}</dd>
          <dt>
            <span id="mqttServerName">
              <Translate contentKey="xAdminApp.device.mqttServerName">Mqtt Server Name</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.mqttServerName}</dd>
          <dt>
            <span id="mqttServerTopic">
              <Translate contentKey="xAdminApp.device.mqttServerTopic">Mqtt Server Topic</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.mqttServerTopic}</dd>
          <dt>
            <Translate contentKey="xAdminApp.device.home">Home</Translate>
          </dt>
          <dd>{deviceEntity.home ? deviceEntity.home.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/device" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/device/${deviceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DeviceDetail;
