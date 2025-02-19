import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import withIntl from '../lib/withIntl';
import InputField from './InputField';

class ExportImages extends React.Component {
  static propTypes = {
    collective: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { tierIndex: 0 };
  }

  render() {
    const { collective } = this.props;

    if (collective.tiers.length === 0) {
      return <div />;
    }

    let i = 0;
    const tiers = collective.tiers.map(tier => {
      return {
        index: i++,
        id: tier.id,
        name: tier.name,
        images: [
          {
            name: 'badge',
            url: `https://opencollective.com/${collective.slug}/tiers/${tier.slug}/badge.svg?label=${tier.name}&color=brightgreen`,
            code: `<img src="https://opencollective.com/${collective.slug}/tiers/${tier.slug}/badge.svg?label=${tier.name}&color=brightgreen" />`,
            options: [
              {
                name: 'label',
                description: 'label of the badge',
                defaultValue: `name of the tier (${tier.name})`,
              },
              {
                name: 'color',
                description:
                  'color of the badge (brightgreen, green, yellowgreen, yellow, orange, red, lightgrey, blue)',
                defaultValue: 'brightgreen',
              },
            ],
          },
          {
            name: 'financial contributors',
            url: `https://opencollective.com/${collective.slug}/tiers/${tier.slug}.svg?avatarHeight=36`,
            code: `<object type="image/svg+xml" data="https://opencollective.com/${collective.slug}/tiers/${tier.slug}.svg?avatarHeight=36&width=600"></object>`,
            options: [
              {
                name: 'width',
                description: 'width of the image',
              },
              {
                name: 'height',
                description: 'height of the image',
              },
              {
                name: 'limit',
                description: 'max number of financial contributors to show',
                defaultValue: '(unlimited)',
              },
              {
                name: 'avatarHeight',
                description: 'max height of each avatar / logo',
              },
              {
                name: 'button',
                description: 'show "become a backer/sponsor" button',
                defaultValue: 'true',
              },
              {
                name: 'format',
                description: 'format of the image (replace .svg with .png or .jpg)',
              },
            ],
          },
        ],
      };
    });

    const tierOptions = tiers.map(tier => {
      return { [tier.index]: tier.name };
    });
    const tier = tiers[this.state.tierIndex];

    return (
      <div className="ExportImages">
        <style global jsx>
          {`
            table {
              font-size: 1.3rem;
            }
            table tr td,
            table tr th {
              vertical-align: top;
              padding: 0.1rem 0.3rem;
            }
            .param {
              font-weight: bold;
              padding-right: 0.5rem;
              font-family: 'Courrier';
            }
            .actions {
              text-align: center;
            }
            .url {
              font-size: 1.4rem;
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
          <FormattedMessage id="export.images.title" defaultMessage="Export images" />
        </h1>
        <p>You can export images showing the financial contributors to each tier.</p>
        <div>
          <InputField
            name="tiers"
            type="select"
            options={tierOptions}
            onChange={tierIndex => this.setState({ tierIndex })}
          />
        </div>
        {tier && (
          <div>
            {tier.images.map(image => (
              <div key={image.name}>
                <label>{image.name}</label>
                <div
                  dangerouslySetInnerHTML={{
                    __html: image.code,
                  }}
                />
                <div className="url">
                  <a href={image.url} target="_blank" rel="noopener noreferrer">
                    {image.url}
                  </a>
                </div>
                <div className="code">{image.code}</div>
                <div>
                  <label>Options:</label>
                  <table>
                    <tbody>
                      <tr>
                        <th>parameter</th>
                        <th>description</th>
                        <th>default value</th>
                      </tr>
                      {image.options.map(option => (
                        <tr key={option.name}>
                          <th valign="top">{option.name}</th>
                          <td valign="top">{option.description}</td>
                          <td valign="top">{option.defaultValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withIntl(ExportImages);
