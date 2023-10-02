import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IHome } from 'app/shared/model/home.model';
import { getEntities } from './home.reducer';

export const Home = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const homeList = useAppSelector(state => state.home.entities);
  const loading = useAppSelector(state => state.home.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="home-heading" data-cy="HomeHeading">
        <Translate contentKey="xAdminApp.home.home.title">Homes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="xAdminApp.home.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/home/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="xAdminApp.home.home.createLabel">Create new Home</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {homeList && homeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="xAdminApp.home.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.home.homeId">Home Id</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.home.homeDesc">Home Desc</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.home.homeAddress">Home Address</Translate>
                </th>
                <th>
                  <Translate contentKey="xAdminApp.home.lastUpdate">Last Update</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {homeList.map((home, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/home/${home.id}`} color="link" size="sm">
                      {home.id}
                    </Button>
                  </td>
                  <td>{home.homeId}</td>
                  <td>{home.homeDesc}</td>
                  <td>{home.homeAddress}</td>
                  <td>{home.lastUpdate}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/home/${home.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/home/${home.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/home/${home.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="xAdminApp.home.home.notFound">No Homes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
