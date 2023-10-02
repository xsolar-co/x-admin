import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IHome } from 'app/shared/model/home.model';
import { getEntity, updateEntity, createEntity, reset } from './home.reducer';

export const HomeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const homeEntity = useAppSelector(state => state.home.entity);
  const loading = useAppSelector(state => state.home.loading);
  const updating = useAppSelector(state => state.home.updating);
  const updateSuccess = useAppSelector(state => state.home.updateSuccess);

  const handleClose = () => {
    navigate('/home');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...homeEntity,
      ...values,
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
          ...homeEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="xAdminApp.home.home.createOrEditLabel" data-cy="HomeCreateUpdateHeading">
            <Translate contentKey="xAdminApp.home.home.createOrEditLabel">Create or edit a Home</Translate>
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
                  id="home-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('xAdminApp.home.homeId')} id="home-homeId" name="homeId" data-cy="homeId" type="text" />
              <ValidatedField
                label={translate('xAdminApp.home.homeDesc')}
                id="home-homeDesc"
                name="homeDesc"
                data-cy="homeDesc"
                type="text"
              />
              <ValidatedField
                label={translate('xAdminApp.home.homeAddress')}
                id="home-homeAddress"
                name="homeAddress"
                data-cy="homeAddress"
                type="text"
              />
              <ValidatedField
                label={translate('xAdminApp.home.lastUpdate')}
                id="home-lastUpdate"
                name="lastUpdate"
                data-cy="lastUpdate"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/home" replace color="info">
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

export default HomeUpdate;
