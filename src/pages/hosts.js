import React from 'react';
import PropTypes from 'prop-types';

import Hosts from '../components/Hosts';

import withIntl from '../lib/withIntl';
import { withUser } from '../components/UserProvider';

class HostsPage extends React.Component {
  static propTypes = {
    LoggedInUser: PropTypes.object,
  };

  render() {
    const { LoggedInUser } = this.props;

    return (
      <div>
        <Hosts LoggedInUser={LoggedInUser} />
      </div>
    );
  }
}

export default withIntl(withUser(HostsPage));
