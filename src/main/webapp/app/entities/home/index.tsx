import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Home from './home';
import HomeDetail from './home-detail';
import HomeUpdate from './home-update';
import HomeDeleteDialog from './home-delete-dialog';

const HomeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Home />} />
    <Route path="new" element={<HomeUpdate />} />
    <Route path=":id">
      <Route index element={<HomeDetail />} />
      <Route path="edit" element={<HomeUpdate />} />
      <Route path="delete" element={<HomeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default HomeRoutes;
