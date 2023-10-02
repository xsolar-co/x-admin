import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './home.reducer';

export const HomeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const homeEntity = useAppSelector(state => state.home.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="homeDetailsHeading">
          <Translate contentKey="xAdminApp.home.detail.title">Home</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{homeEntity.id}</dd>
          <dt>
            <span id="homeId">
              <Translate contentKey="xAdminApp.home.homeId">Home Id</Translate>
            </span>
          </dt>
          <dd>{homeEntity.homeId}</dd>
          <dt>
            <span id="homeDesc">
              <Translate contentKey="xAdminApp.home.homeDesc">Home Desc</Translate>
            </span>
          </dt>
          <dd>{homeEntity.homeDesc}</dd>
          <dt>
            <span id="homeAddress">
              <Translate contentKey="xAdminApp.home.homeAddress">Home Address</Translate>
            </span>
          </dt>
          <dd>{homeEntity.homeAddress}</dd>
          <dt>
            <span id="lastUpdate">
              <Translate contentKey="xAdminApp.home.lastUpdate">Last Update</Translate>
            </span>
          </dt>
          <dd>{homeEntity.lastUpdate}</dd>
        </dl>
        <Button tag={Link} to="/home" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/home/${homeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default HomeDetail;
