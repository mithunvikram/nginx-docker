import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class Constants {
  // API
  // Inventory
  public static get GetAll_Inventory(): string { return '/Inventory/getall/'; }
  public static get User_Create(): string { return '/Inventory/create/'; }
  public static get User_Update(): string { return '/Inventory/update/'; }
  public static get User_Delete(): string { return '/Inventory/delete/'; }
  public static get GetAll_Active_Inventories(): string { return '/Inventory/getallactiveinventory'; }
  public static get GetInventoryByCompanyCode(): string { return '/Inventory/getinventorybycompanycode'; }
  public static get GetInventoryById(): string { return '/Inventory/get/'; }
  public static get GetInventorycount(): string { return '/Inventory/getCount'; }
  public static get GetInventoryFiltervalue(): string { return '/Inventory/getInventoryFilterValue'; }
  public static get GetInventoryFiltervalueByComapnycode(): string {return '/Inventory/getInventoryFilterValueByCode/'; }
  public static get ExportInventory(): string { return '/Inventory/exportAllInventory'; }
  public static get InventoryFilter(): string { return '/Inventory/filterinventory'; }
  public static get InventoryFilterbyCode(): string { return '/Inventory/Filtervaluebycompanycode/'; }
  // Inventory Items
  public static get GetAllInventoryItems(): string { return '/InventoryItems/getall'; }
  public static get GetInventoryItemById(): string { return '/InventoryItems/get/'; }
  public static get GetInventoryItemBydate(): string { return '/InventoryItems/getInventoryItemsByDateRange'; }
  public static get GetInventoryItemBydatecode(): string { return '/InventoryItems/getInventoryItemsByDateRangeCode'; }

  // User Management
  public static get get_All_User(): string { return '/User/getall'; }
  public static get create_User(): string { return '/User/create'; }
  public static get update_User(): string { return '/User/update'; }
  public static get disable_User(): string { return '/User/disableuser/'; }
  public static get get_All_User_By_Org(): string { return '/User/getuserByOrganization/'; }
  public static get get_UserData(): string { return '/User/get/'; }
  public static get get_user(): string { return '/User/Username/'; }


  // User Authorities
  public static get get_All_UserRole(): string { return '/Authorities/getall'; }
  public static get get_UserRole_Details(): string { return '/Authorities/get/'; }
  public static get get_All_UserRole_By_Org(): string { return '/Authorities/getallbyOrganization/'; }
  public static get create_User_Role(): string { return '/Authorities/create'; }
  public static get update_User_Role(): string { return '/Authorities/update'; }
  public static get disable_User_Role(): string { return '/Authorities/disableuserrole/'; }
  public static get get_role(): string { return '/Authorities/role/'; }
  public static get get_roleWorg(): string { return '/Authorities/roleWorg/'; }

  // Purchase Order
  public static get get_all_purchase_order(): string { return '/PurchaseOrders/getall'; }
  public static get get_all_purchase_order_by_org(): string { return '/PurchaseOrders/org/getall/'; }
  public static get getFilterValues(): string { return '/PurchaseOrders/getFilterValue'; }
  public static get getpurchaseorderbyid(): string { return '/PurchaseOrders/get/'; }

  // Ticket
  public static get upload_file(): string { return '/file/upload'; }
  public static get update_Ticket(): string { return '/Ticket/update'; }
  public static get Reopen_ticket(): string { return '/Ticket/Reopenticket'; }
  public static get createAssignedUserTicket(): string { return '/assignedUserTicket/create'; }
  public static get LogHistory(): string { return '/TicketHistory/create'; }
  public static get GetTickethistroy(): string { return '/TicketHistory/get'; }
  public static get Searchcomments(): string { return '/TicketComment/getTicketsByComment/'; }
  public static get OrgSearchcomments(): string { return '/TicketComment/getTicketsByCommentCode/'; }
  public static get ticketcreation(): string { return  '/Ticket/create'; }
  public static get savefile(): string { return '/file/save'; }
  public static get getorder(): string { return '/SalesOrder/getorder'; }
  public static get getfilebyid(): string { return '/file/getbyid/'; }
  public static get deletefile(): string { return '/file/delete/'; }
  public static get getusers(): string { return '/User/get/'; }
  public static get Createcomment(): string { return '/TicketComment/create'; }
  public static get getallcomments(): string { return '/TicketComment/getall/'; }
  public static get getalltickets(): string { return '/Ticket/getall'; }
  public static get Ticketbyorg(): string { return '/Ticket/getbyorg/'; }
  public static get Ticketsearch(): string { return '/Ticket/search'; }
  public static get Ticketsearchbyid(): string { return '/Ticket/searchByOrgId'; }
  public static get TicketFilterbyOrgid(): string { return  '/Ticket/getFilterByOrgId/' ; }
  public static get Ticketfilter(): string { return '/Ticket/getFilter'; }
  public static get Ticketgetall(): string { return '/Ticket/getAllTickets'; }
  public static get getTicketbyOrgid(): string { return '/Ticket/getAllTicketByOrgId'; }
  // Mail
  public static get send_Mail(): string { return '/Mail/send'; }

  // CloseReason

  public static get getcloseReason(): string { return '/CloseReason/getreason'; }

  // Organization
  public static get orgGetAll(): string { return '/Organization/getall'; }
  public static get uploadImage(): string { return '/Organization/upload'; }
  public static get createOrganization(): string { return '/Organization/create'; }
  public static get deleteOrganization(): string { return '/Organization/delete/'; }
  public static get updateorganization(): string { return '/Organization/update'; }
  public static get getorganization(): string { return '/Organization/get/'; }

  // Dashboard
  public static get get_priority(): string { return '/Ticket/priorityticket/'; }
  public static get get_priorityOrg(): string { return '/Ticket/Org/priorityticket/'; }


  public static get get_ordersReceived(): string { return '/Order/recevied'; }

  public static get get_ordersOnTime(): string { return '/Order/onTime'; }
  public static get get_ordersOnTimeToday(): string { return '/Order/onTimeToday'; }

  public static get get_ordersTopSelling(): string { return '/Order/topSelling/'; }
  public static get get_ordersReceivedToday(): string { return '/Order/receviedToday'; }
  public static get get_ordersShipped(): string { return '/Order/shipment'; }
  public static get get_ordersShippedToday(): string { return '/Order/shipmentToday'; }
  public static get get_ordersOnTimeShipped(): string { return '/Order/onTimeShipped/'; }
  public static get get_ordersOnTimeForecast(): string { return '/Order/onTimeForecast/'; }

  public static get get_barGraphDataShipped(): string { return '/Order/shipmentBarGraph/'; }
  public static get get_timeGraphData(): string { return '/Order/forcasted/'; }

  public static get get_barGraphData(): string { return '/Order/receviedBarGraph/'; }

  // ---Org Dashboard

  public static get get_ordersReceivedOrg(): string { return '/Order/Org/recevied/'; }

  public static get get_ordersOnTimeOrg(): string { return '/Order/Org/onTime/'; }
  public static get get_ordersOnTimeTodayOrg(): string { return '/Order/Org/onTimeToday/'; }

  public static get get_ordersTopSellingOrg(): string { return '/Order/Org/topSelling/'; }
  public static get get_ordersReceivedTodayOrg(): string { return '/Order/Org/receviedToday/'; }
  public static get get_ordersShippedOrg(): string { return '/Order/Org/shipment/'; }
  public static get get_ordersShippedTodayOrg(): string { return '/Order/Org/shipmentToday/'; }
  public static get get_ordersOnTimeShippedOrg(): string { return '/Order/Org/onTimeShipped/'; }
  public static get get_ordersOnTimeForecastOrg(): string { return '/Order/Org/onTimeForecast/'; }

  public static get get_barGraphDataShippedOrg(): string { return '/Order/Org/shipmentBarGraph/'; }
  public static get get_timeGraphDataOrg(): string { return '/Order/Org/forcasted/'; }

  public static get get_barGraphDataOrg(): string { return '/Order/Org/receviedBarGraph/'; }

  // SyncService
  public static get get_allSyncService(): string { return '/getsyncservice/getall'; }
  public static get frequencyupdate(): string { return '/frequency/update'; }
  public static get getfrequency(): string { return '/frequency/get'; }
  public static get getsynccount(): string { return '/frequency/getCount'; }
  public static get updatesynccount(): string { return '/frequency/updateCount'; }

  // User
  public static get updatepassword(): string { return '/User/UpdatePassword'; }
  public static get updateuser(): string {return  '/User/update'; }
  public static get Forgotpassword(): string {return '/User/ForgotPassword'; }

  // Invoice
  public static get GetAllInvoice(): string { return '/Invoices/getall'; }
  public static get GetInvoiceByOrg(): string { return '/Invoices/org/getall/'; }
  public static get GetInvoiceByCode(): string { return '/Invoices/org/getall/'; }
  public static get GetInvoiceFiltervalue(): string { return '/Invoices/getInvoicesFilterValue'; }
  public static get GetInvoiceFilterbydata(): string { return '/Invoices/getInvoicesFilterValueData'; }
  public static get GetInvoiceFilterdatabycode(): string { return '/Invoices/getInvoicesFilterValueDataByCode/'; }
  public static get GetInvoiceFiltervaluebyCode(): string { return '/Invoices/getInvoicesFilterValueByCode/'; }

  // MailNotification
  public static get GetAllMail(): string { return '/Mail/getAll/group'; }
  public static get CreateMail(): string { return '/Mail/create/group'; }
  public static get UpdateMail(): string { return '/Mail/update/group'; }
  public static get DeleteMail(): string { return '/Mail/delete/group/'; }

  // OrderDetail
  public static get SalesorderbyId(): string { return '/SalesOrder/get/'; }
  public static get Saleorderitem(): string { return '/SalesOrder/getOrderAndItems/'; }

  // Order
  public static get ExportSalesOrder(): string { return '/SalesOrder/getExportSalesOrder'; }
  public static get ExportSalesOrderbyCode(): string { return '/SalesOrder/getExportSalesOrderByCode'; }
  public static get SalesOrderByFiltervalue(): string { return '/SalesOrder/getSalesOrderFilterValue'; }
  public static get SalesOrderByFilterData(): string { return '/SalesOrder/getSalesOrderFilterValueData'; }
  public static get SalesOrderByFilterDatabycode(): string { return '/SalesOrder/getSalesOrderFilterValueDataByCode/'; }
  public static get SalesOrderFilterValuebycode(): string { return '/SalesOrder/getSalesOrderFilterValueByCode/'; }
  public static get SalesOrderCountBystatusname(): string { return '/SalesOrder/getCountByStatusName'; }
  public static get SalesOrderCountBystatusnamebycode(): string { return '/SalesOrder/getStatusNameCountByCode/'; }
  public static get getsalesorderBystatus(): string { return  '/SalesOrder/getSalesOrderByStatusName/'; }
  public static get SalesOrderByOrg(): string { return '/SalesOrder/Org/getall'; }
  public static get salesorderbystatus(): string { return '/SalesOrder/getSalesOrderByStatusName'; }
  public static get SalesorderstatusbyOrg(): string { return '/SalesOrder/Org/getSalesOrderByStatusName'; }

  // Shipments
  public static get Shipmentgetall(): string { return '/Shipments/getall'; }
  public static get ShipmentbyOrg(): string { return '/Shipments/Org/getall/'; }
  public static get Shipmentbyid(): string { return '/Shipments/get/'; }
  public static get shipmentbydate(): string { return '/Shipments/getShipmentByDate'; }
  public static get shipmentdatebycode(): string { return '/Shipments/getShipmentByDateCode'; }
  public static get shipmentbyfiltervalue(): string { return '/Shipments/getShipmentFilterValue'; }
  public static get shipmentfilterbycode(): string { return '/Shipments/getShipmentFilterByCompanycode/'; }
  public static get shipmentponumberbydate(): string { return '/Shipments/getPonumberByDate'; }
  public static get getallshipment(): string { return '/Shipments/getall'; }
  public static get getallshipmentbyorg(): string { return '/Shipments/Org/getall'; }

  // PackedBox
  public static get packedboxbyid(): string { return '/Shipments/get/packedBoxItem/'; }

  // PackedItem
  public static get packedItemid(): string { return '/Shipments/getpackeditem/'; }
}
