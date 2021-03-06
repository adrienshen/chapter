import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { AppStoreState } from 'client/store/reducers';
import { eventActions } from 'client/store/actions';
import { IEventModal } from 'client/store/types/events';
import useThunkDispatch from 'client/hooks/useThunkDispatch';
import EventItem from 'client/components/Dashboard/Events/EventItem';
import Layout from 'client/components/Dashboard/shared/Layout';

const Events: React.FC = () => {
  const { error, loading, events } = useSelector((state: AppStoreState) => ({
    error: state.events.error,
    loading: state.events.loading,
    events: state.events.events,
  }));
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(eventActions.fetchEvents('1'));
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link href="/dashboard/events/new">
            <a>Add new</a>
          </Link>
          {error ? (
            <h1>😢Error</h1>
          ) : (
            events.map((event: IEventModal) => (
              <EventItem
                event={event}
                loading={loading && !event}
                key={`events-${event.id}`}
              />
            ))
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Events;
