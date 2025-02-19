import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import withIntl from '../lib/withIntl';
import { exportMembers } from '../lib/export_file';
import ExportImages from './ExportImages';

class ExportData extends React.Component {
  static propTypes = {
    collective: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { collective } = this.props;
    const widgetCode = `<script src="https://opencollective.com/${collective.slug}/banner.js"></script>`;

    return (
      <div className="ExportData">
        <style global jsx>
          {`
            table tr td {
              vertical-align: top;
            }
            .param {
              font-weight: bold;
              padding-right: 0.5rem;
              font-family: 'Courrier';
            }
            .actions {
              text-align: center;
            }
            .code {
              font-size: 1.4rem;
              font-family: Courrier;
              padding: 0.1rem 0.3rem;
              background: #ddd;
              margin: 0.5rem;
              border: 1px solid #ccc;
            }
          `}
        </style>

        <h1>
          <FormattedMessage id="export.widget.title" defaultMessage="Widget" />
        </h1>
        <div className="code">{widgetCode}</div>

        <ExportImages collective={collective} />

        <h1>
          <FormattedMessage id="export.csv.title" defaultMessage="Export CSV" />
        </h1>
        <p>
          <FormattedMessage id="export.csv.description" defaultMessage="Export your contributor data in CSV format" />
        </p>
        <div className="actions">
          <Button onClick={async () => await exportMembers(collective.slug)}>
            <FormattedMessage id="export.all" defaultMessage="Export CSV" />
          </Button>
        </div>

        <h1>
          <FormattedMessage id="export.json.title" defaultMessage="Export JSON" />
        </h1>
        <p>
          <FormattedMessage id="export.json.description" defaultMessage="Export your contributor data in JSON format" />
        </p>
        <ul>
          <li>
            All contributors:
            <br />
            <a href={`/${collective.slug}/members/all.json`}>
              https://opencollective.com/
              {collective.slug}
              /members/all.json
            </a>
          </li>
          <li>
            Only individuals:
            <br />
            <a href={`/${collective.slug}/members/users.json`}>
              https://opencollective.com/
              {collective.slug}
              /members/users.json
            </a>
          </li>
          <li>
            Only organizations:
            <br />
            <a href={`/${collective.slug}/members/organizations.json`}>
              https://opencollective.com/
              {collective.slug}
              /members/organizations.json
            </a>
          </li>
        </ul>

        <h2>
          <FormattedMessage id="export.json.parameters.title" defaultMessage="Parameters" />
        </h2>
        <table>
          <tbody>
            <tr>
              <td className="param">limit</td>
              <td>
                <FormattedMessage id="export.json.parameters.limit" defaultMessage="number of contributors to return" />
              </td>
            </tr>
            <tr>
              <td className="param">offset</td>
              <td>
                <FormattedMessage
                  id="export.json.parameters.offset"
                  defaultMessage="number of contributors to skip (for paging)"
                />
              </td>
            </tr>
            <tr>
              <td className="param">TierId</td>
              <td>
                <FormattedMessage
                  id="export.json.parameters.TierId"
                  defaultMessage="only return contributors that belong to this TierID, which you can find in the URL after selecting a tier on your Collective page."
                />
              </td>
            </tr>
          </tbody>
        </table>
        {collective.tiers[0] && (
          <div>
            e.g.
            <br />
            <a href={`/${collective.slug}/members/all.json?limit=10&offset=0&TierId=${collective.tiers[0].id}`}>
              https://opencollective.com/
              {collective.slug}
              /members/all.json?limit=10&offset=0&TierId=
              {collective.tiers[0].id}
            </a>
          </div>
        )}
        {!collective.tiers[0] && (
          <div>
            e.g.
            <br />
            <a href={`/${collective.slug}/members/all.json?limit=10&offset=0`}>
              https://opencollective.com/
              {collective.slug}
              /members/all.json?limit=10&offset=0
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default withIntl(ExportData);
