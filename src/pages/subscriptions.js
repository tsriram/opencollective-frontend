import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import SubscriptionsWithData from '../components/SubscriptionsWithData';

import colors from '../constants/colors';

import withIntl from '../lib/withIntl';
import { withUser } from '../components/UserProvider';

class SubscriptionsPage extends React.Component {
  static getInitialProps({ query: { collectiveSlug } }) {
    return { slug: collectiveSlug };
  }

  static propTypes = {
    slug: PropTypes.string,
    LoggedInUser: PropTypes.func.isRequired, // from withLoggedInUser
  };

  render() {
    const { slug, LoggedInUser } = this.props;
    return (
      <div className="SubscriptionsPage">
        <Header
          title={'Subscriptions'}
          description="All the collectives that you are giving money to"
          LoggedInUser={LoggedInUser}
        />
        <style jsx>
          {`
            .Subscriptions-container {
              background-color: ${colors.offwhite};
              overflow: hidden;
              min-height: 500px;
            }
            .content {
              align-items: left;
              color: black;
              margin: auto;
              margin-top: 100px;
              margin-left: 32px;
              max-width: 1024px;
            }
            .small .content {
              margin-top: 0px;
            }
            .Subscriptions-header {
              text-align: left;
              overflow: hidden;
              max-width: 1024px;
            }
            .Subscriptions-title {
              margin: auto;
              font-size: 40px;
              font-weight: 700;
              line-height: 1.08;
              text-align: left;
              color: ${colors.black};
              border-left: 4px solid ${colors.ocblue};
              padding-left: 32px;
            }
          `}
        </style>
        <Body>
          <div className="Subscriptions-container">
            <div className="content">
              <div className="Subscriptions-header">
                <div className="Subscriptions-title">
                  {slug}
                  &apos;s subscriptions
                </div>
              </div>

              <div className="Subscriptions-listing">
                <SubscriptionsWithData slug={slug} LoggedInUser={LoggedInUser} />
              </div>
            </div>
          </div>
        </Body>
        <Footer />
      </div>
    );
  }
}

export default withUser(withIntl(SubscriptionsPage));
