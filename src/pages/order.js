import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import OrderWithData from '../components/expenses/OrderWithData';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CollectiveCover from '../components/CollectiveCover';
import ErrorPage from '../components/ErrorPage';
import Link from '../components/Link';

import { addCollectiveCoverData } from '../graphql/queries';

import withIntl from '../lib/withIntl';
import { withUser } from '../components/UserProvider';

class OrderPage extends React.Component {
  static getInitialProps({ query: { collectiveSlug, OrderId } }) {
    return { slug: collectiveSlug, OrderId: Number(OrderId) };
  }

  static propTypes = {
    slug: PropTypes.string, // for addCollectiveCoverData
    OrderId: PropTypes.number,
    data: PropTypes.object.isRequired, // from withData
    LoggedInUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPayActionLocked: false,
    };
  }

  render() {
    const { data, OrderId } = this.props;
    const { LoggedInUser } = this.props;

    if (!data.Collective) return <ErrorPage data={data} />;

    const collective = data.Collective;

    return (
      <div className="OrderPage">
        <style jsx>
          {`
            .columns {
              display: flex;
            }

            .col.side {
              width: 100%;
              min-width: 20rem;
              max-width: 25%;
              margin-left: 5rem;
            }

            .col.large {
              width: 100%;
              min-width: 30rem;
              max-width: 75%;
            }

            @media (max-width: 600px) {
              .columns {
                flex-direction: column-reverse;
              }
              .columns .col {
                max-width: 100%;
              }
            }

            .viewAllOrders {
              font-size: 1.2rem;
            }
          `}
        </style>

        <Header
          title={collective.name}
          description={collective.description}
          twitterHandle={collective.twitterHandle}
          image={collective.image || collective.backgroundImage}
          LoggedInUser={LoggedInUser}
        />

        <Body>
          <CollectiveCover
            key={collective.slug}
            collective={collective}
            LoggedInUser={LoggedInUser}
            displayContributeLink={collective.isActive && collective.host ? true : false}
          />

          <div className="content">
            <div className=" columns">
              <div className="col large">
                <div className="viewAllOrders">
                  <Link route={`/${collective.slug}/orders`}>
                    <FormattedMessage id="orders.viewAll" defaultMessage="View All Orders" />
                  </Link>
                </div>

                <OrderWithData id={OrderId} collective={collective} view="details" LoggedInUser={LoggedInUser} />
              </div>

              <div className="col side" />
            </div>
          </div>
        </Body>

        <Footer />
      </div>
    );
  }
}

export default withIntl(withUser(addCollectiveCoverData(OrderPage)));
