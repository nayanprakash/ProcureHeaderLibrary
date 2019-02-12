/*
 * @file: common.js
 * @description: It Contain all common constants.
 * @date: 06.08.2018
 * @author: Jasdeep Singh
 */

/********** Role permissions validator ************/
export const user_accounts = 'user_accounts';
export const user_roles = 'user_roles';
export const multi_tenant = 'multi_tenant';
export const manage_organization = 'manage_organization';

export const itemListPerPage = [
  { id: '10', name: '10 per page' },
  { id: '25', name: '25 per page' },
  { id: '50', name: '50 per page' },
  { id: '100', name: '100 per page' }
];

/********** Role permissions ************/
export const menuPermissions = [
  'Assets',
  'Inventory',
  'Contacts',
  'Order Request',
  'Shipping',
  'Receiving',
  'Report',
  'Admin'
];

export const menuView = [
  { _id: 'assets_view', name: 'Assets' },
  { _id: 'inventory_view', name: 'Inventory' },
  { _id: 'contacts_view', name: 'Contacts' },
  { _id: 'or_view', name: 'Order Request' },
  { _id: 'shipping_view', name: 'Shipping' },
  { _id: 'receiving_view', name: 'Receiving' },
  { _id: 'report_view', name: 'Report' },
  { _id: 'admin_view', name: 'Admin' }
];

export const menuNew = [
  { _id: 'new_asset', name: 'Assets' },
  { _id: 'new_inventory', name: 'Inventory' },
  { _id: 'new_contacts', name: 'Contacts' },
  { _id: 'or_new', name: 'Order Request' },
  { _id: 'new_shipping', name: 'Shipping' },
  { _id: 'new_receiving', name: 'Receiving' },
  { _id: 'new_report', name: 'Report' },
  { _id: 'new_admin', name: 'Admin' }
];

export const menuEdit = [
  { _id: 'assets_edit', name: 'Assets' },
  { _id: 'inventory_edit', name: 'Inventory' },
  { _id: 'contacts_edit', name: 'Contacts' },
  { _id: 'or_edit', name: 'Order Request' },
  { _id: 'shipping_edit', name: 'Shipping' },
  { _id: 'receiving_edit', name: 'Receiving' },
  { _id: 'report_edit', name: 'Report' },
  { _id: 'admin_edit', name: 'Admin' }
];

export const menuDelete = [
  { _id: 'delete_asset', name: 'Assets' },
  { _id: 'delete_inventory', name: 'Inventory' },
  { _id: 'delete_contacts', name: 'Contacts' },
  { _id: 'or_delete', name: 'Order Request' },
  { _id: 'delete_shipping', name: 'Shipping' },
  { _id: 'delete_receiving', name: 'Receiving' },
  { _id: 'delete_report', name: 'Report' },
  { _id: 'delete_admin', name: 'Admin' }
];

export const transactionAssets = [
  { _id: 'asset_check_in_out', name: 'Check Out' },
  { _id: 'asset_kit', name: 'Kit' },
  { _id: 'asset_move', name: 'Move' },
  { _id: 'asset_remove', name: 'Remove' },
  { _id: 'asset_reserve_unreserve', name: 'Reserve' },
  { _id: 'asset_restock', name: 'Restock' }
];

export const transactionInventory = [
  { _id: 'kit', name: 'Kit' },
  { _id: 'transaction_move', name: 'Move' },
  { _id: 'transaction_remove', name: 'Remove' },
  { _id: 'transaction_restock', name: 'Restock' }
];

export const admin = [
  { _id: 'categories_view', name: 'Categories' },
  { _id: 'departments_view', name: 'Departments' },
  { _id: 'depreciation', name: 'Depreciation' },
  { _id: 'import', name: 'Import' },
  { _id: 'labels_view', name: 'Labels' },
  { _id: 'locations_view', name: 'Locations' },
  { _id: 'projects_view', name: 'Projects' },
  { _id: 'protected_files', name: 'Protected Documents' },
  { _id: 'shipping_receiving', name: 'Shipping / Receiving' },
  { _id: 'inventory_login', name: 'Inventory Login' },

  { _id: 'site_view', name: 'Sites' },
  { _id: 'multi_tenant', name: 'Tenants' },
  { _id: 'undelete', name: 'Undelete' },
  { _id: 'user_accounts', name: 'User Accounts' },
  { _id: 'user_roles', name: 'User Roles' },
  { _id: 'manage_organization', name: 'Organization' },
  { _id: 'notification_asset_reminder', name: 'Asset Reminders' },
  { _id: 'notification_minq_site', name: 'Site Notifications' },
  { _id: 'notification_minq_category', name: 'Category Notifications' },
  { _id: 'or_login', name: 'OR Login' }
];
/********** Role permissions ************/
