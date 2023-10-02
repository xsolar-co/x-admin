import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDevice } from 'app/shared/model/device.model';
import { getEntities } from './device.reducer';

export const Device = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const deviceList = useAppSelector(state => state.device.entities);
  const loading = useAppSelector(state => state.device.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="device-heading" data-cy="DeviceHeading">
        <Translate contentKey="xAdminApp.device.home.title">Devices</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="xAdminApp.device.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/device/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="xAdminApp.device.home.createLabel">Create new Device</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {deviceList && deviceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="xAdminApp.device.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.device.deviceID">Device ID</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.device.deviceName">Device Name</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.device.deviceType">Device Type</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.device.deviceDesc">Device Desc</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.device.deviceStatus">Device Status</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.device.mqttServerName">Mqtt Server Name</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.device.mqttServerTopic">Mqtt Server Topic</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.device.home">Home</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {deviceList.map((device, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/device/${device.id}`} color="link" size="sm">
                      {device.id}
                    </Button>
                  </td>
                  <td>{device.deviceID}</td>
                  <td>{device.deviceName}</td>
                  <td>{device.deviceType}</td>
                  <td>{device.deviceDesc}</td>
                  <td>{device.deviceStatus}</td>
                  <td>{device.mqttServerName}</td>
                  <td>{device.mqttServerTopic}</td>
                  <td>{device.home ? <Link to={`/home/${device.home.id}`}>{device.home.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/device/${device.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/device/${device.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/device/${device.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="xAdminApp.device.home.notFound">No Devices found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Device;
