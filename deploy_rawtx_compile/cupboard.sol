pragma solidity ^0.4.25;

contract CupboardContract {
    //1、终端管理：云柜ID；名称；设备编号；CPU序列号；所属合伙人；Mac地址；APK版本；商品表类型；在线状态；状态。
  struct yg_terminal{
      bytes32  yg_id;
      bytes32  yg_name;
      bytes32  device_sn;  //*
      bytes32  cpu_sn;     //*
      bytes32  partner;    //*
      bytes32  mac_addr;   //*
      bytes32  apk_version;
      bytes32  commodity;
      bytes32  online_status;
      bytes32  status;
      bytes32  info;
  }
  
//2、智能云柜-用户交易记录：用户名；手机号；订单编号；交易号；交易额；创建时间；支付类型；支付装填；计算异常。
 struct transaction_record{
      string  user_name;  //*
      string  cell_number; //*
      string  order_number;
      string  transactoin_number;
      string  Transaction_amount;
      string  create_time;
      string  pay_type;
      string  payload;
      string  pay_exception;
      string  info;
  }
  
  //3、智能云柜-充值记录：用户名；手机号；订单编号充值额；创建时间；支付时间；支付状态；支付类型；微信交易ID；
   struct recharge_record{
      string  user_name;   //*
      string  cell_number; //*
      string  order_number_amount;
      string  create_time;
      string  pay_time;
      string  pay_status;
      string  pay_type;
      string  wechar_id; //*
      string  info;
  }
  
  //供应链管理-大仓管理：仓库名称；仓库地址；状态；创建时间；修改时间；
   struct big_warehouse_manager{
      string  warehouse_name;
      string  warehouse_address; //*
      string  status;
      string  create_time;
      string  modify_time;
      string  info;
  }
  
  //供应链管理-云仓管理：仓库名称；是否实仓；仓库地址；所属片区；仓库管理员；状态；创建时间；修改时间；
   struct cloud_warehouse_manager{
      string  warehouse_name;
      string  real;
      string  warehouse_address; //*
      string  warehouse_area;
      string  warehouse_keeper;
      string  status;
      string  create_time;
      string  modify_time;
      string  info;
  }
  
//  商圈管理-商圈信息：商圈名称；所属城市；状态；创建时间；修改时间；
   struct business_circle{
      string  name;
      string  city;
      string  status;
      string  create_time;
      string  modify_time;
      string  info;
  }
  
  //7、商圈管理-商业片区：商业片区名称；所属商圈；状态；创建时间；修改时间；
   struct business_circle_area{
      string  name;
      string  business_circle;
      string  status;
      string  create_time;
      string  modify_time;
      string  info;
  }
  
  //8、商圈管理-楼宇管理：楼宇名称；所属片区；所属云仓库；状态；创建时间；修改时间；
  struct bussiness_circle_building{
      string building_name;
      string bussiness_area;
      string cloud_warehouse_name;
      string  status;
      string  create_time;
      string  modify_time;
      string  info;
  }
  
  
  address public owner;
  uint public mapSize;
  mapping (bytes32=> yg_terminal) private map_yg_terminal;
  mapping (string=> transaction_record) private map_transaction_record;
  mapping (string=> recharge_record) private map_recharge_record;
  mapping (string=> big_warehouse_manager) private map_big_warehouse_manager;
  mapping (string=> cloud_warehouse_manager) private map_cloud_warehouse_manager;
  mapping (string=> business_circle) private map_business_circle;
  mapping (string=> business_circle_area) private map_business_circle_area;
  mapping (string=> bussiness_circle_building) private map_bussiness_circle_building;
  mapping (uint=>address) public mapIndex;
  /***************************************/
  constructor () public {
      mapSize = 0;
      owner = msg.sender;
  }
 /* function CupboardContract() public{
      mapSize = 0;
      owner = msg.sender;
  }*/


 /*   string  yg_id;
      string  yg_name;
      string  device_sn;  //*
      string  cpu_sn;     //*
      string  partner;    //*
      string  mac_addr;   //*
      string  apk_version;
      string  commodity;
      string  online_status;
      string  status;
      string  info;*/
  uint public storedData;

  function update_yg_terminal(bytes32 yg_id, bytes32 yg_name, bytes32 device_sn, bytes32 cpu_sn, bytes32 partner, 
       bytes32 mac_addr, bytes32 apk_version, bytes32 commodity, bytes32 online_status, bytes32 status) public {
    map_yg_terminal[yg_id].yg_id = yg_id;
    map_yg_terminal[yg_id].yg_name = yg_name;
    map_yg_terminal[yg_id].device_sn = device_sn;
    map_yg_terminal[yg_id].cpu_sn = cpu_sn;
    map_yg_terminal[yg_id].partner = partner;
    map_yg_terminal[yg_id].mac_addr = mac_addr;
    map_yg_terminal[yg_id].apk_version = apk_version;
    map_yg_terminal[yg_id].commodity = commodity;
    map_yg_terminal[yg_id].online_status = online_status;
    map_yg_terminal[yg_id].status = status;
    
  }

  function get_yg_terminal(bytes32 yg_id) constant public returns(bytes32, bytes32, bytes32, bytes32, bytes32, 
       bytes32, bytes32, bytes32, bytes32, bytes32 ) {
    yg_terminal memory yg = map_yg_terminal[yg_id];
    return (yg.yg_id, yg.yg_name, yg.device_sn, yg.cpu_sn, yg.partner, yg.mac_addr, yg.apk_version, yg.commodity, yg.online_status, yg.status);
    /*return (map_yg_terminal[yg_id].yg_id, map_yg_terminal[yg_id].yg_name, map_yg_terminal[yg_id].device_sn, map_yg_terminal[yg_id].cpu_sn,
    map_yg_terminal[yg_id].partner, map_yg_terminal[yg_id].mac_addr, map_yg_terminal[yg_id].apk_version, map_yg_terminal[yg_id].commodity,
    map_yg_terminal[yg_id].online_status, map_yg_terminal[yg_id].status);*/
  }
}


