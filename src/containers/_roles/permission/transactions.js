import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { transactionAssets, transactionInventory } from '../../../constants';

const transaction = ({ menuPermissionsArr, _handleCheck }) => {
  return (
    <div className="permission_box">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-7" />
            <div className="col-5 permit-action">Assets</div>
          </div>
          <div className="row">
            <div className="col-7 text-right">
              <strong>Select All</strong>
            </div>
            <div className="col-5 permit-action">
              <span
                className={
                  transactionAssets.length &&
                  _.difference(
                    _.chain(transactionAssets)
                      .pluck('_id')
                      .value(),
                    menuPermissionsArr
                  ).length === 0
                    ? 'active'
                    : ''
                }
                onClick={() => _handleCheck('transactionAssest')}
              >
                <i className="fa fa-minus" aria-hidden="true" />
              </span>
            </div>
          </div>
          {transactionAssets.map((val, index) => (
            <div className="row" key={`asset_tr_${index}`}>
              <div className="col-7 text-right minheight27">{val.name.capitalizeEachLetter()}</div>
              <div className="col-5 permit-action">
                <span
                  className={menuPermissionsArr.includes(val._id) ? 'active' : ''}
                  onClick={() => _handleCheck(val._id)}
                >
                  <i className="fa fa-minus" aria-hidden="true" />
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          <div className="row">
            <div className="col-7" />
            <div className="col-5 permit-action">Inventory</div>
          </div>
          <div className="row" key="select_all">
            <div className="col-7 text-right">
              <strong>Select All</strong>
            </div>
            <div className="col-5 permit-action">
              <span
                className={
                  transactionInventory.length &&
                  _.difference(
                    _.chain(transactionInventory)
                      .pluck('_id')
                      .value(),
                    menuPermissionsArr
                  ).length === 0
                    ? 'active'
                    : ''
                }
                onClick={() => _handleCheck('transaction')}
              >
                <i className="fa fa-minus" aria-hidden="true" />
              </span>
            </div>
          </div>
          {transactionInventory.map((val, index) => (
            <div className="row" key={`tran_${index}`}>
              <div className="col-7 text-right minheight27">{val.name.capitalizeEachLetter()}</div>
              <div className="col-5 permit-action">
                <span
                  className={menuPermissionsArr.includes(val._id) ? 'active' : ''}
                  onClick={() => _handleCheck(val._id)}
                >
                  <i className="fa fa-minus" aria-hidden="true" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

transaction.propTypes = {
  menuPermissionsArr: PropTypes.array.isRequired,
  _handleCheck: PropTypes.func.isRequired
};

export default transaction;
