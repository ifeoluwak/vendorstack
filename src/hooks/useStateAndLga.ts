import {useEffect, useState} from 'react';

const data = [
  {
    lganame: 'ABA NORTH',
    statename: 'ABIA',
  },
  {
    lganame: 'ABA SOUTH',
    statename: 'ABIA',
  },
  {
    lganame: 'AROCHUKWU',
    statename: 'ABIA',
  },
  {
    lganame: 'BENDE',
    statename: 'ABIA',
  },
  {
    lganame: 'IKWUANO',
    statename: 'ABIA',
  },
  {
    lganame: 'ISIALA NGWA NORTH',
    statename: 'ABIA',
  },
  {
    lganame: 'ISIALA NGWA SOUTH',
    statename: 'ABIA',
  },
  {
    lganame: 'ISUIKWUATO',
    statename: 'ABIA',
  },
  {
    lganame: 'OBI NGWA',
    statename: 'ABIA',
  },
  {
    lganame: 'OHAFIA',
    statename: 'ABIA',
  },
  {
    lganame: 'OSISIOMA',
    statename: 'ABIA',
  },
  {
    lganame: 'UGWUNAGBO',
    statename: 'ABIA',
  },
  {
    lganame: 'UKWA EAST',
    statename: 'ABIA',
  },
  {
    lganame: 'UKWA WEST',
    statename: 'ABIA',
  },
  {
    lganame: 'UMUAHIA NORTH',
    statename: 'ABIA',
  },
  {
    lganame: 'UMU NNEOCHI',
    statename: 'ABIA',
  },
  {
    lganame: 'ABUJA',
    statename: 'FCT',
  },
  {
    lganame: 'ABUJA MUNICIPAL',
    statename: 'FCT',
  },
  {
    lganame: 'BWARI',
    statename: 'FCT',
  },
  {
    lganame: 'GWAGWALADA',
    statename: 'FCT',
  },
  {
    lganame: 'KUJE',
    statename: 'FCT',
  },
  {
    lganame: 'KWALI',
    statename: 'FCT',
  },
  {
    lganame: 'DEMSA',
    statename: 'Adamawa',
  },
  {
    lganame: 'FUFORE',
    statename: 'Adamawa',
  },
  {
    lganame: 'GANYE',
    statename: 'Adamawa',
  },
  {
    lganame: 'GAYUK',
    statename: 'Adamawa',
  },
  {
    lganame: 'GIREI',
    statename: 'Adamawa',
  },
  {
    lganame: 'GOMBI',
    statename: 'Adamawa',
  },
  {
    lganame: 'HONG',
    statename: 'Adamawa',
  },
  {
    lganame: 'JADA',
    statename: 'Adamawa',
  },
  {
    lganame: 'LAMURDE',
    statename: 'Adamawa',
  },
  {
    lganame: 'MADAGALI',
    statename: 'Adamawa',
  },
  {
    lganame: 'MAIHA',
    statename: 'Adamawa',
  },
  {
    lganame: 'MAYO BELWA',
    statename: 'Adamawa',
  },
  {
    lganame: 'MICHIKA',
    statename: 'Adamawa',
  },
  {
    lganame: 'MUBI NORTH',
    statename: 'Adamawa',
  },
  {
    lganame: 'NUMAN',
    statename: 'Adamawa',
  },
  {
    lganame: 'SONG',
    statename: 'Adamawa',
  },
  {
    lganame: 'TOUNGO',
    statename: 'Adamawa',
  },
  {
    lganame: 'YOLA NORTH',
    statename: 'Adamawa',
  },
  {
    lganame: 'YOLA SOUTH',
    statename: 'Adamawa',
  },
  {
    lganame: 'ABAK',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'EASTERN OBOLO',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'EKET',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'ESIT EKET',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'ESSIEN UDIM',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'ETIM EKPO',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'ETINAN',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'IBENO',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'IBESIKPO ASUTAN',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'IKA',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'IKOT ABASI',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'IKOT EKPENE',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'INI',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'ITU',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'MBO',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'NSIT-ATAI',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'NSIT-IBOM',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'OBOT AKARA',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'OKOBO',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'ONNA',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'ORON',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'ORUK ANAM',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'UDUNG-UKO',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'UKANAFUN',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'URUAN',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'URUE-OFFONG/ORUKO',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'UYO',
    statename: 'AKWA IBOM',
  },
  {
    lganame: 'ALKALERI',
    statename: 'Bauchi',
  },
  {
    lganame: 'BAUCHI',
    statename: 'Bauchi',
  },
  {
    lganame: 'BOGORO',
    statename: 'Bauchi',
  },
  {
    lganame: 'DAMBAN',
    statename: 'Bauchi',
  },
  {
    lganame: 'DARAZO',
    statename: 'Bauchi',
  },
  {
    lganame: 'DASS',
    statename: 'Bauchi',
  },
  {
    lganame: 'GAMAWA',
    statename: 'Bauchi',
  },
  {
    lganame: 'GANJUWA',
    statename: 'Bauchi',
  },
  {
    lganame: 'GIADE',
    statename: 'Bauchi',
  },
  {
    lganame: 'ITAS/GADAU',
    statename: 'Bauchi',
  },
  {
    lganame: "JAMA'ARE",
    statename: 'Bauchi',
  },
  {
    lganame: 'KATAGUM',
    statename: 'Bauchi',
  },
  {
    lganame: 'KIRFI',
    statename: 'Bauchi',
  },
  {
    lganame: 'MISAU',
    statename: 'Bauchi',
  },
  {
    lganame: 'NINGI',
    statename: 'Bauchi',
  },
  {
    lganame: 'SHIRA',
    statename: 'Bauchi',
  },
  {
    lganame: 'TAFAWA BALEWA',
    statename: 'Bauchi',
  },
  {
    lganame: 'TORO',
    statename: 'Bauchi',
  },
  {
    lganame: 'WARJI',
    statename: 'Bauchi',
  },
  {
    lganame: 'ZAKI',
    statename: 'Bauchi',
  },
  {
    lganame: 'BRASS',
    statename: 'Bayelsa',
  },
  {
    lganame: 'EKEREMOR',
    statename: 'Bayelsa',
  },
  {
    lganame: 'KOLOKUMA/OPOKUMA',
    statename: 'Bayelsa',
  },
  {
    lganame: 'NEMBE',
    statename: 'Bayelsa',
  },
  {
    lganame: 'OGBIA',
    statename: 'Bayelsa',
  },
  {
    lganame: 'SAGBAMA',
    statename: 'Bayelsa',
  },
  {
    lganame: 'SOUTHERN IJAW',
    statename: 'Bayelsa',
  },
  {
    lganame: 'YENAGOA',
    statename: 'Bayelsa',
  },
  {
    lganame: 'ADO',
    statename: 'Benue',
  },
  {
    lganame: 'AGATU',
    statename: 'Benue',
  },
  {
    lganame: 'APA',
    statename: 'Benue',
  },
  {
    lganame: 'GUMA',
    statename: 'Benue',
  },
  {
    lganame: 'GWER EAST',
    statename: 'Benue',
  },
  {
    lganame: 'KONSHISHA',
    statename: 'Benue',
  },
  {
    lganame: 'KWANDE',
    statename: 'Benue',
  },
  {
    lganame: 'LOGO',
    statename: 'Benue',
  },
  {
    lganame: 'MAKURDI',
    statename: 'Benue',
  },
  {
    lganame: 'OBI',
    statename: 'Benue',
  },
  {
    lganame: 'OHIMINI',
    statename: 'Benue',
  },
  {
    lganame: 'OKPOKWU',
    statename: 'Benue',
  },
  {
    lganame: 'OTURKPO',
    statename: 'Benue',
  },
  {
    lganame: 'TARKA',
    statename: 'Benue',
  },
  {
    lganame: 'USHONGO',
    statename: 'Benue',
  },
  {
    lganame: 'VANDEIKYA',
    statename: 'Benue',
  },
  {
    lganame: 'ABADAM',
    statename: 'Borno',
  },
  {
    lganame: 'ASKIRA-UBA',
    statename: 'Borno',
  },
  {
    lganame: 'BAMA',
    statename: 'Borno',
  },
  {
    lganame: 'BAYO',
    statename: 'Borno',
  },
  {
    lganame: 'BIU',
    statename: 'Borno',
  },
  {
    lganame: 'CHIBOK',
    statename: 'Borno',
  },
  {
    lganame: 'DAMBOA',
    statename: 'Borno',
  },
  {
    lganame: 'DIKWA',
    statename: 'Borno',
  },
  {
    lganame: 'GUBIO',
    statename: 'Borno',
  },
  {
    lganame: 'GUZAMALA',
    statename: 'Borno',
  },
  {
    lganame: 'GWOZA',
    statename: 'Borno',
  },
  {
    lganame: 'HAWUL',
    statename: 'Borno',
  },
  {
    lganame: 'JERE',
    statename: 'Borno',
  },
  {
    lganame: 'KAGA',
    statename: 'Borno',
  },
  {
    lganame: 'KALA-BALGE',
    statename: 'Borno',
  },
  {
    lganame: 'KONDUGA',
    statename: 'Borno',
  },
  {
    lganame: 'KUKAWA',
    statename: 'Borno',
  },
  {
    lganame: 'KWAYA KUSAR',
    statename: 'Borno',
  },
  {
    lganame: 'MAFA',
    statename: 'Borno',
  },
  {
    lganame: 'MAGUMERI',
    statename: 'Borno',
  },
  {
    lganame: 'MAIDUGURI',
    statename: 'Borno',
  },
  {
    lganame: 'MARTE',
    statename: 'Borno',
  },
  {
    lganame: 'MOBBAR',
    statename: 'Borno',
  },
  {
    lganame: 'MONGUNO',
    statename: 'Borno',
  },
  {
    lganame: 'NGALA',
    statename: 'Borno',
  },
  {
    lganame: 'NGANZAI',
    statename: 'Borno',
  },
  {
    lganame: 'SHANI',
    statename: 'Borno',
  },
  {
    lganame: 'ABI',
    statename: 'Cross River',
  },
  {
    lganame: 'AKAMKPA',
    statename: 'Cross River',
  },
  {
    lganame: 'BAKASSI',
    statename: 'Cross River',
  },
  {
    lganame: 'BEKWARRA',
    statename: 'Cross River',
  },
  {
    lganame: 'BOKI',
    statename: 'Cross River',
  },
  {
    lganame: 'CALABAR MUNICIPAL',
    statename: 'Cross River',
  },
  {
    lganame: 'IKOM',
    statename: 'Cross River',
  },
  {
    lganame: 'OBUBRA',
    statename: 'Cross River',
  },
  {
    lganame: 'OBUDU',
    statename: 'Cross River',
  },
  {
    lganame: 'ANIOCHA NORTH',
    statename: 'Delta',
  },
  {
    lganame: 'ANIOCHA SOUTH',
    statename: 'Delta',
  },
  {
    lganame: 'BOMADI',
    statename: 'Delta',
  },
  {
    lganame: 'BURUTU',
    statename: 'Delta',
  },
  {
    lganame: 'ETHIOPE EAST',
    statename: 'Delta',
  },
  {
    lganame: 'ETHIOPE WEST',
    statename: 'Delta',
  },
  {
    lganame: 'IKA NORTH EAST',
    statename: 'Delta',
  },
  {
    lganame: 'IKA SOUTH',
    statename: 'Delta',
  },
  {
    lganame: 'ISOKO NORTH',
    statename: 'Delta',
  },
  {
    lganame: 'ISOKO SOUTH',
    statename: 'Delta',
  },
  {
    lganame: 'NDOKWA EAST',
    statename: 'Delta',
  },
  {
    lganame: 'NDOKWA WEST',
    statename: 'Delta',
  },
  {
    lganame: 'OKPE',
    statename: 'Delta',
  },
  {
    lganame: 'OSHIMILI NORTH',
    statename: 'Delta',
  },
  {
    lganame: 'OSHIMILI SOUTH',
    statename: 'Delta',
  },
  {
    lganame: 'PATANI',
    statename: 'Delta',
  },
  {
    lganame: 'SAPELE',
    statename: 'Delta',
  },
  {
    lganame: 'UDU',
    statename: 'Delta',
  },
  {
    lganame: 'UGHELLI NORTH',
    statename: 'Delta',
  },
  {
    lganame: 'UGHELLI SOUTH',
    statename: 'Delta',
  },
  {
    lganame: 'UKWUANI',
    statename: 'Delta',
  },
  {
    lganame: 'UVWIE',
    statename: 'Delta',
  },
  {
    lganame: 'WARRI NORTH',
    statename: 'Delta',
  },
  {
    lganame: 'WARRI SOUTH',
    statename: 'Delta',
  },
  {
    lganame: 'ABAKALIKI',
    statename: 'Ebonyi',
  },
  {
    lganame: 'AFIKPO SOUTH',
    statename: 'Ebonyi',
  },
  {
    lganame: 'EBONYI',
    statename: 'Ebonyi',
  },
  {
    lganame: 'EZZA NORTH',
    statename: 'Ebonyi',
  },
  {
    lganame: 'IKWO',
    statename: 'Ebonyi',
  },
  {
    lganame: 'ISHIELU',
    statename: 'Ebonyi',
  },
  {
    lganame: 'IZZI',
    statename: 'Ebonyi',
  },
  {
    lganame: 'OHAOZARA',
    statename: 'Ebonyi',
  },
  {
    lganame: 'OHAUKWU',
    statename: 'Ebonyi',
  },
  {
    lganame: 'ONICHA',
    statename: 'Ebonyi',
  },
  {
    lganame: 'AKOKO-EDO',
    statename: 'Edo',
  },
  {
    lganame: 'EGOR',
    statename: 'Edo',
  },
  {
    lganame: 'ESAN CENTRAL',
    statename: 'Edo',
  },
  {
    lganame: 'ESAN NORTH-EAST',
    statename: 'Edo',
  },
  {
    lganame: 'ESAN SOUTH-EAST',
    statename: 'Edo',
  },
  {
    lganame: 'ESAN WEST',
    statename: 'Edo',
  },
  {
    lganame: 'ETSAKO CENTRAL',
    statename: 'Edo',
  },
  {
    lganame: 'ETSAKO EAST',
    statename: 'Edo',
  },
  {
    lganame: 'ETSAKO WEST',
    statename: 'Edo',
  },
  {
    lganame: 'IGUEBEN',
    statename: 'Edo',
  },
  {
    lganame: 'IKPOBA OKHA',
    statename: 'Edo',
  },
  {
    lganame: 'OREDO',
    statename: 'Edo',
  },
  {
    lganame: 'ORHIONMWON',
    statename: 'Edo',
  },
  {
    lganame: 'OVIA NORTH-EAST',
    statename: 'Edo',
  },
  {
    lganame: 'OVIA SOUTH-WEST',
    statename: 'Edo',
  },
  {
    lganame: 'OWAN EAST',
    statename: 'Edo',
  },
  {
    lganame: 'OWAN WEST',
    statename: 'Edo',
  },
  {
    lganame: 'UHUNMWONDE',
    statename: 'Edo',
  },
  {
    lganame: 'ADO EKITI',
    statename: 'Ekiti',
  },
  {
    lganame: 'EFON',
    statename: 'Ekiti',
  },
  {
    lganame: 'EMURE',
    statename: 'Ekiti',
  },
  {
    lganame: 'GBONYIN (AIYEKIRE)',
    statename: 'Ekiti',
  },
  {
    lganame: 'IDO-OSI',
    statename: 'Ekiti',
  },
  {
    lganame: 'IJERO',
    statename: 'Ekiti',
  },
  {
    lganame: 'IKERE',
    statename: 'Ekiti',
  },
  {
    lganame: 'IKOLE',
    statename: 'Ekiti',
  },
  {
    lganame: 'ILEJEMEJE',
    statename: 'Ekiti',
  },
  {
    lganame: 'IREPODUN/IFELODUN',
    statename: 'Ekiti',
  },
  {
    lganame: 'ISE/ORUN',
    statename: 'Ekiti',
  },
  {
    lganame: 'OYE',
    statename: 'Ekiti',
  },
  {
    lganame: 'ANINRI',
    statename: 'Enugu',
  },
  {
    lganame: 'AWGU',
    statename: 'Enugu',
  },
  {
    lganame: 'ENUGU EAST',
    statename: 'Enugu',
  },
  {
    lganame: 'ENUGU NORTH',
    statename: 'Enugu',
  },
  {
    lganame: 'ENUGU SOUTH',
    statename: 'Enugu',
  },
  {
    lganame: 'EZEAGU',
    statename: 'Enugu',
  },
  {
    lganame: 'IGBO ETITI',
    statename: 'Enugu',
  },
  {
    lganame: 'IGBO EZE NORTH',
    statename: 'Enugu',
  },
  {
    lganame: 'ISI UZO',
    statename: 'Enugu',
  },
  {
    lganame: 'NKANU EAST',
    statename: 'Enugu',
  },
  {
    lganame: 'NKANU WEST',
    statename: 'Enugu',
  },
  {
    lganame: 'NSUKKA',
    statename: 'Enugu',
  },
  {
    lganame: 'OJI RIVER',
    statename: 'Enugu',
  },
  {
    lganame: 'UDENU',
    statename: 'Enugu',
  },
  {
    lganame: 'UDI',
    statename: 'Enugu',
  },
  {
    lganame: 'UZO UWANI',
    statename: 'Enugu',
  },
  {
    lganame: 'AKKO',
    statename: 'Gombe',
  },
  {
    lganame: 'BALANGA',
    statename: 'Gombe',
  },
  {
    lganame: 'BILLIRI',
    statename: 'Gombe',
  },
  {
    lganame: 'DUKKU',
    statename: 'Gombe',
  },
  {
    lganame: 'FUNAKAYE',
    statename: 'Gombe',
  },
  {
    lganame: 'GOMBE',
    statename: 'Gombe',
  },
  {
    lganame: 'KALTUNGO',
    statename: 'Gombe',
  },
  {
    lganame: 'KWAMI',
    statename: 'Gombe',
  },
  {
    lganame: 'NAFADA',
    statename: 'Gombe',
  },
  {
    lganame: 'SHONGOM',
    statename: 'Gombe',
  },
  {
    lganame: 'YAMALTU/DEBA',
    statename: 'Gombe',
  },
  {
    lganame: 'ABOH MBAISE',
    statename: 'Imo',
  },
  {
    lganame: 'AHIAZU MBAISE',
    statename: 'Imo',
  },
  {
    lganame: 'EHIME MBANO',
    statename: 'Imo',
  },
  {
    lganame: 'EZINIHITTE-MBAISE',
    statename: 'Imo',
  },
  {
    lganame: 'IDEATO NORTH',
    statename: 'Imo',
  },
  {
    lganame: 'IDEATO SOUTH',
    statename: 'Imo',
  },
  {
    lganame: 'IHITTE/UBOMA',
    statename: 'Imo',
  },
  {
    lganame: 'IKEDURU',
    statename: 'Imo',
  },
  {
    lganame: 'ISIALA MBANO',
    statename: 'Imo',
  },
  {
    lganame: 'ISU',
    statename: 'Imo',
  },
  {
    lganame: 'MBAITOLI',
    statename: 'Imo',
  },
  {
    lganame: 'NGOR OKPALA',
    statename: 'Imo',
  },
  {
    lganame: 'NJABA',
    statename: 'Imo',
  },
  {
    lganame: 'NKWERRE',
    statename: 'Imo',
  },
  {
    lganame: 'NWANGELE',
    statename: 'Imo',
  },
  {
    lganame: 'OBOWO',
    statename: 'Imo',
  },
  {
    lganame: 'OGUTA',
    statename: 'Imo',
  },
  {
    lganame: 'OHAJI/EGBEMA',
    statename: 'Imo',
  },
  {
    lganame: 'OKIGWE',
    statename: 'Imo',
  },
  {
    lganame: 'ORLU',
    statename: 'Imo',
  },
  {
    lganame: 'ORSU',
    statename: 'Imo',
  },
  {
    lganame: 'ORU EAST',
    statename: 'Imo',
  },
  {
    lganame: 'ORU WEST',
    statename: 'Imo',
  },
  {
    lganame: 'OWERRI MUNICIPAL',
    statename: 'Imo',
  },
  {
    lganame: 'OWERRI NORTH',
    statename: 'Imo',
  },
  {
    lganame: 'OWERRI WEST',
    statename: 'Imo',
  },
  {
    lganame: 'UNUIMO',
    statename: 'Imo',
  },
  {
    lganame: 'AUYO',
    statename: 'Jigawa',
  },
  {
    lganame: 'BABURA',
    statename: 'Jigawa',
  },
  {
    lganame: 'BIRINIWA',
    statename: 'Jigawa',
  },
  {
    lganame: 'BIRNIN KUDU',
    statename: 'Jigawa',
  },
  {
    lganame: 'BUJI',
    statename: 'Jigawa',
  },
  {
    lganame: 'DUTSE',
    statename: 'Jigawa',
  },
  {
    lganame: 'GAGARAWA',
    statename: 'Jigawa',
  },
  {
    lganame: 'GARKI',
    statename: 'Jigawa',
  },
  {
    lganame: 'GUMEL',
    statename: 'Jigawa',
  },
  {
    lganame: 'GURI',
    statename: 'Jigawa',
  },
  {
    lganame: 'GWARAM',
    statename: 'Jigawa',
  },
  {
    lganame: 'GWIWA',
    statename: 'Jigawa',
  },
  {
    lganame: 'HADEJIA',
    statename: 'Jigawa',
  },
  {
    lganame: 'JAHUN',
    statename: 'Jigawa',
  },
  {
    lganame: 'KAFIN HAUSA',
    statename: 'Jigawa',
  },
  {
    lganame: 'KAUGAMA',
    statename: 'Jigawa',
  },
  {
    lganame: 'KAZAURE',
    statename: 'Jigawa',
  },
  {
    lganame: 'KIRI KASAMA',
    statename: 'Jigawa',
  },
  {
    lganame: 'KIYAWA',
    statename: 'Jigawa',
  },
  {
    lganame: 'MAIGATARI',
    statename: 'Jigawa',
  },
  {
    lganame: 'MALAM MADORI',
    statename: 'Jigawa',
  },
  {
    lganame: 'MIGA',
    statename: 'Jigawa',
  },
  {
    lganame: 'RINGIM',
    statename: 'Jigawa',
  },
  {
    lganame: 'RONI',
    statename: 'Jigawa',
  },
  {
    lganame: 'SULE TANKARKAR',
    statename: 'Jigawa',
  },
  {
    lganame: 'TAURA',
    statename: 'Jigawa',
  },
  {
    lganame: 'YANKWASHI',
    statename: 'Jigawa',
  },
  {
    lganame: 'BIRNIN GWARI',
    statename: 'Kaduna',
  },
  {
    lganame: 'CHIKUN',
    statename: 'Kaduna',
  },
  {
    lganame: 'GIWA',
    statename: 'Kaduna',
  },
  {
    lganame: 'IGABI',
    statename: 'Kaduna',
  },
  {
    lganame: 'IKARA',
    statename: 'Kaduna',
  },
  {
    lganame: 'JABA',
    statename: 'Kaduna',
  },
  {
    lganame: "JEMA'A",
    statename: 'Kaduna',
  },
  {
    lganame: 'KACHIA',
    statename: 'Kaduna',
  },
  {
    lganame: 'KADUNA NORTH',
    statename: 'Kaduna',
  },
  {
    lganame: 'KAGARKO',
    statename: 'Kaduna',
  },
  {
    lganame: 'KAJURU',
    statename: 'Kaduna',
  },
  {
    lganame: 'KAURA',
    statename: 'Kaduna',
  },
  {
    lganame: 'KAURU',
    statename: 'Kaduna',
  },
  {
    lganame: 'KUBAU',
    statename: 'Kaduna',
  },
  {
    lganame: 'KUDAN',
    statename: 'Kaduna',
  },
  {
    lganame: 'LERE',
    statename: 'Kaduna',
  },
  {
    lganame: 'MAKARFI',
    statename: 'Kaduna',
  },
  {
    lganame: 'SABON GARI',
    statename: 'Kaduna',
  },
  {
    lganame: 'SANGA',
    statename: 'Kaduna',
  },
  {
    lganame: 'SOBA',
    statename: 'Kaduna',
  },
  {
    lganame: 'ZANGON KATAF',
    statename: 'Kaduna',
  },
  {
    lganame: 'ZARIA',
    statename: 'Kaduna',
  },
  {
    lganame: 'AJINGI',
    statename: 'Kano',
  },
  {
    lganame: 'ALBASU',
    statename: 'Kano',
  },
  {
    lganame: 'BAGWAI',
    statename: 'Kano',
  },
  {
    lganame: 'BEBEJI',
    statename: 'Kano',
  },
  {
    lganame: 'BICHI',
    statename: 'Kano',
  },
  {
    lganame: 'BUNKURE',
    statename: 'Kano',
  },
  {
    lganame: 'DAMBATTA',
    statename: 'Kano',
  },
  {
    lganame: 'DAWAKIN KUDU',
    statename: 'Kano',
  },
  {
    lganame: 'DAWAKIN TOFA',
    statename: 'Kano',
  },
  {
    lganame: 'DOGUWA',
    statename: 'Kano',
  },
  {
    lganame: 'GABASAWA',
    statename: 'Kano',
  },
  {
    lganame: 'GARKO',
    statename: 'Kano',
  },
  {
    lganame: 'GARUN MALLAM',
    statename: 'Kano',
  },
  {
    lganame: 'GAYA',
    statename: 'Kano',
  },
  {
    lganame: 'GEZAWA',
    statename: 'Kano',
  },
  {
    lganame: 'GWALE',
    statename: 'Kano',
  },
  {
    lganame: 'GWARZO',
    statename: 'Kano',
  },
  {
    lganame: 'KABO',
    statename: 'Kano',
  },
  {
    lganame: 'KANO MUNICIPAL',
    statename: 'Kano',
  },
  {
    lganame: 'KARAYE',
    statename: 'Kano',
  },
  {
    lganame: 'KIBIYA',
    statename: 'Kano',
  },
  {
    lganame: 'KIRU',
    statename: 'Kano',
  },
  {
    lganame: 'KUMBOTSO',
    statename: 'Kano',
  },
  {
    lganame: 'KUNCHI',
    statename: 'Kano',
  },
  {
    lganame: 'KURA',
    statename: 'Kano',
  },
  {
    lganame: 'MADOBI',
    statename: 'Kano',
  },
  {
    lganame: 'MAKODA',
    statename: 'Kano',
  },
  {
    lganame: 'MINJIBIR',
    statename: 'Kano',
  },
  {
    lganame: 'RANO',
    statename: 'Kano',
  },
  {
    lganame: 'RIMIN GADO',
    statename: 'Kano',
  },
  {
    lganame: 'ROGO',
    statename: 'Kano',
  },
  {
    lganame: 'SHANONO',
    statename: 'Kano',
  },
  {
    lganame: 'SUMAILA',
    statename: 'Kano',
  },
  {
    lganame: 'TAKAI',
    statename: 'Kano',
  },
  {
    lganame: 'TARAUNI',
    statename: 'Kano',
  },
  {
    lganame: 'TOFA',
    statename: 'Kano',
  },
  {
    lganame: 'TSANYAWA',
    statename: 'Kano',
  },
  {
    lganame: 'TUDUN WADA',
    statename: 'Kano',
  },
  {
    lganame: 'UNGOGO',
    statename: 'Kano',
  },
  {
    lganame: 'WARAWA',
    statename: 'Kano',
  },
  {
    lganame: 'WUDIL',
    statename: 'Kano',
  },
  {
    lganame: 'BAKORI',
    statename: 'Katsina',
  },
  {
    lganame: 'BATAGARAWA',
    statename: 'Katsina',
  },
  {
    lganame: 'BATSARI',
    statename: 'Katsina',
  },
  {
    lganame: 'BAURE',
    statename: 'Katsina',
  },
  {
    lganame: 'BINDAWA',
    statename: 'Katsina',
  },
  {
    lganame: 'CHARANCHI',
    statename: 'Katsina',
  },
  {
    lganame: 'DANDUME',
    statename: 'Katsina',
  },
  {
    lganame: 'DANJA',
    statename: 'Katsina',
  },
  {
    lganame: 'DAN MUSA',
    statename: 'Katsina',
  },
  {
    lganame: 'DAURA',
    statename: 'Katsina',
  },
  {
    lganame: 'DUTSI',
    statename: 'Katsina',
  },
  {
    lganame: 'DUTSIN MA',
    statename: 'Katsina',
  },
  {
    lganame: 'FASKARI',
    statename: 'Katsina',
  },
  {
    lganame: 'FUNTUA',
    statename: 'Katsina',
  },
  {
    lganame: 'INGAWA',
    statename: 'Katsina',
  },
  {
    lganame: 'JIBIA',
    statename: 'Katsina',
  },
  {
    lganame: 'KAFUR',
    statename: 'Katsina',
  },
  {
    lganame: 'KAITA',
    statename: 'Katsina',
  },
  {
    lganame: 'KANKARA',
    statename: 'Katsina',
  },
  {
    lganame: 'KANKIA',
    statename: 'Katsina',
  },
  {
    lganame: 'KATSINA',
    statename: 'Katsina',
  },
  {
    lganame: 'KURFI',
    statename: 'Katsina',
  },
  {
    lganame: 'KUSADA',
    statename: 'Katsina',
  },
  {
    lganame: "MAI'ADUA",
    statename: 'Katsina',
  },
  {
    lganame: 'MALUMFASHI',
    statename: 'Katsina',
  },
  {
    lganame: 'MANI',
    statename: 'Katsina',
  },
  {
    lganame: 'MASHI',
    statename: 'Katsina',
  },
  {
    lganame: 'MATAZU',
    statename: 'Katsina',
  },
  {
    lganame: 'MUSAWA',
    statename: 'Katsina',
  },
  {
    lganame: 'RIMI',
    statename: 'Katsina',
  },
  {
    lganame: 'SABUWA',
    statename: 'Katsina',
  },
  {
    lganame: 'SAFANA',
    statename: 'Katsina',
  },
  {
    lganame: 'SANDAMU',
    statename: 'Katsina',
  },
  {
    lganame: 'ZANGO',
    statename: 'Katsina',
  },
  {
    lganame: 'ALEIRO',
    statename: 'Kebbi',
  },
  {
    lganame: 'AREWA DANDI',
    statename: 'Kebbi',
  },
  {
    lganame: 'ARGUNGU',
    statename: 'Kebbi',
  },
  {
    lganame: 'AUGIE',
    statename: 'Kebbi',
  },
  {
    lganame: 'BAGUDO',
    statename: 'Kebbi',
  },
  {
    lganame: 'BIRNIN KEBBI',
    statename: 'Kebbi',
  },
  {
    lganame: 'BUNZA',
    statename: 'Kebbi',
  },
  {
    lganame: 'DANDI',
    statename: 'Kebbi',
  },
  {
    lganame: 'FAKAI',
    statename: 'Kebbi',
  },
  {
    lganame: 'GWANDU',
    statename: 'Kebbi',
  },
  {
    lganame: 'JEGA',
    statename: 'Kebbi',
  },
  {
    lganame: 'KALGO',
    statename: 'Kebbi',
  },
  {
    lganame: 'KOKO-BESSE',
    statename: 'Kebbi',
  },
  {
    lganame: 'MAIYAMA',
    statename: 'Kebbi',
  },
  {
    lganame: 'NGASKI',
    statename: 'Kebbi',
  },
  {
    lganame: 'SAKABA',
    statename: 'Kebbi',
  },
  {
    lganame: 'SHANGA',
    statename: 'Kebbi',
  },
  {
    lganame: 'SURU',
    statename: 'Kebbi',
  },
  {
    lganame: 'WASAGU-DANKO',
    statename: 'Kebbi',
  },
  {
    lganame: 'YAURI',
    statename: 'Kebbi',
  },
  {
    lganame: 'ZURU',
    statename: 'Kebbi',
  },
  {
    lganame: 'ADAVI',
    statename: 'Kogi',
  },
  {
    lganame: 'AJAOKUTA',
    statename: 'Kogi',
  },
  {
    lganame: 'ANKPA',
    statename: 'Kogi',
  },
  {
    lganame: 'BASSA',
    statename: 'Kogi',
  },
  {
    lganame: 'DEKINA',
    statename: 'Kogi',
  },
  {
    lganame: 'IBAJI',
    statename: 'Kogi',
  },
  {
    lganame: 'IDAH',
    statename: 'Kogi',
  },
  {
    lganame: 'IJUMU',
    statename: 'Kogi',
  },
  {
    lganame: 'KABBA/BUNU',
    statename: 'Kogi',
  },
  {
    lganame: 'KOGI',
    statename: 'Kogi',
  },
  {
    lganame: 'LOKOJA',
    statename: 'Kogi',
  },
  {
    lganame: 'OFU',
    statename: 'Kogi',
  },
  {
    lganame: 'OGORI/MAGONGO',
    statename: 'Kogi',
  },
  {
    lganame: 'OKEHI',
    statename: 'Kogi',
  },
  {
    lganame: 'OKENE',
    statename: 'Kogi',
  },
  {
    lganame: 'OLAMABORO',
    statename: 'Kogi',
  },
  {
    lganame: 'OMALA',
    statename: 'Kogi',
  },
  {
    lganame: 'YAGBA EAST',
    statename: 'Kogi',
  },
  {
    lganame: 'YAGBA WEST',
    statename: 'Kogi',
  },
  {
    lganame: 'ASA',
    statename: 'Kwara',
  },
  {
    lganame: 'BARUTEN',
    statename: 'Kwara',
  },
  {
    lganame: 'EDU',
    statename: 'Kwara',
  },
  {
    lganame: 'EKITI',
    statename: 'Kwara',
  },
  {
    lganame: 'IFELODUN',
    statename: 'Kwara',
  },
  {
    lganame: 'ILORIN SOUTH',
    statename: 'Kwara',
  },
  {
    lganame: 'ILORIN WEST',
    statename: 'Kwara',
  },
  {
    lganame: 'IREPODUN',
    statename: 'Kwara',
  },
  {
    lganame: 'ISIN',
    statename: 'Kwara',
  },
  {
    lganame: 'MORO',
    statename: 'Kwara',
  },
  {
    lganame: 'OFFA',
    statename: 'Kwara',
  },
  {
    lganame: 'OKE ERO',
    statename: 'Kwara',
  },
  {
    lganame: 'OYUN',
    statename: 'Kwara',
  },
  {
    lganame: 'PATEGI',
    statename: 'Kwara',
  },
  {
    lganame: 'AGEGE',
    statename: 'Lagos',
  },
  {
    lganame: 'AJEROMI-IFELODUN',
    statename: 'Lagos',
  },
  {
    lganame: 'ALIMOSHO',
    statename: 'Lagos',
  },
  {
    lganame: 'AMUWO-ODOFIN',
    statename: 'Lagos',
  },
  {
    lganame: 'APAPA',
    statename: 'Lagos',
  },
  {
    lganame: 'BADAGRY',
    statename: 'Lagos',
  },
  {
    lganame: 'EPE',
    statename: 'Lagos',
  },
  {
    lganame: 'ETI-OSA',
    statename: 'Lagos',
  },
  {
    lganame: 'IBEJU-LEKKI',
    statename: 'Lagos',
  },
  {
    lganame: 'IFAKO-IJAYE',
    statename: 'Lagos',
  },
  {
    lganame: 'IKEJA',
    statename: 'Lagos',
  },
  {
    lganame: 'IKORODU',
    statename: 'Lagos',
  },
  {
    lganame: 'KOSOFE',
    statename: 'Lagos',
  },
  {
    lganame: 'LAGOS ISLAND',
    statename: 'Lagos',
  },
  {
    lganame: 'MUSHIN',
    statename: 'Lagos',
  },
  {
    lganame: 'OJO',
    statename: 'Lagos',
  },
  {
    lganame: 'OSHODI-ISOLO',
    statename: 'Lagos',
  },
  {
    lganame: 'SHOMOLU',
    statename: 'Lagos',
  },
  {
    lganame: 'SURULERE',
    statename: 'Lagos',
  },
  {
    lganame: 'AKWANGA',
    statename: 'Nasarawa',
  },
  {
    lganame: 'AWE',
    statename: 'Nasarawa',
  },
  {
    lganame: 'DOMA',
    statename: 'Nasarawa',
  },
  {
    lganame: 'KARU',
    statename: 'Nasarawa',
  },
  {
    lganame: 'KEANA',
    statename: 'Nasarawa',
  },
  {
    lganame: 'KEFFI',
    statename: 'Nasarawa',
  },
  {
    lganame: 'KOKONA',
    statename: 'Nasarawa',
  },
  {
    lganame: 'LAFIA',
    statename: 'Nasarawa',
  },
  {
    lganame: 'NASARAWA',
    statename: 'Nasarawa',
  },
  {
    lganame: 'NASARAWA EGON',
    statename: 'Nasarawa',
  },
  {
    lganame: 'OBI',
    statename: 'Nasarawa',
  },
  {
    lganame: 'TOTO',
    statename: 'Nasarawa',
  },
  {
    lganame: 'WAMBA',
    statename: 'Nasarawa',
  },
  {
    lganame: 'AGAIE',
    statename: 'Niger',
  },
  {
    lganame: 'AGWARA',
    statename: 'Niger',
  },
  {
    lganame: 'BIDA',
    statename: 'Niger',
  },
  {
    lganame: 'BORGU',
    statename: 'Niger',
  },
  {
    lganame: 'BOSSO',
    statename: 'Niger',
  },
  {
    lganame: 'CHANCHAGA',
    statename: 'Niger',
  },
  {
    lganame: 'GBAKO',
    statename: 'Niger',
  },
  {
    lganame: 'GURARA',
    statename: 'Niger',
  },
  {
    lganame: 'KATCHA',
    statename: 'Niger',
  },
  {
    lganame: 'KONTAGORA',
    statename: 'Niger',
  },
  {
    lganame: 'LAPAI',
    statename: 'Niger',
  },
  {
    lganame: 'LAVUN',
    statename: 'Niger',
  },
  {
    lganame: 'MAGAMA',
    statename: 'Niger',
  },
  {
    lganame: 'MARIGA',
    statename: 'Niger',
  },
  {
    lganame: 'MASHEGU',
    statename: 'Niger',
  },
  {
    lganame: 'MOKWA',
    statename: 'Niger',
  },
  {
    lganame: 'MUNYA',
    statename: 'Niger',
  },
  {
    lganame: 'PAIKORO',
    statename: 'Niger',
  },
  {
    lganame: 'RAFI',
    statename: 'Niger',
  },
  {
    lganame: 'RIJAU',
    statename: 'Niger',
  },
  {
    lganame: 'SHIRORO',
    statename: 'Niger',
  },
  {
    lganame: 'SULEJA',
    statename: 'Niger',
  },
  {
    lganame: 'TAFA',
    statename: 'Niger',
  },
  {
    lganame: 'WUSHISHI',
    statename: 'Niger',
  },
  {
    lganame: 'ABEOKUTA NORTH',
    statename: 'Ogun',
  },
  {
    lganame: 'ABEOKUTA SOUTH',
    statename: 'Ogun',
  },
  {
    lganame: 'ADO-ODO/OTA',
    statename: 'Ogun',
  },
  {
    lganame: 'EWEKORO',
    statename: 'Ogun',
  },
  {
    lganame: 'IFO',
    statename: 'Ogun',
  },
  {
    lganame: 'IJEBU EAST',
    statename: 'Ogun',
  },
  {
    lganame: 'IJEBU NORTH',
    statename: 'Ogun',
  },
  {
    lganame: 'IJEBU NORTH EAST',
    statename: 'Ogun',
  },
  {
    lganame: 'IJEBU ODE',
    statename: 'Ogun',
  },
  {
    lganame: 'IKENNE',
    statename: 'Ogun',
  },
  {
    lganame: 'IMEKO AFON',
    statename: 'Ogun',
  },
  {
    lganame: 'OBAFEMI OWODE',
    statename: 'Ogun',
  },
  {
    lganame: 'ODEDA',
    statename: 'Ogun',
  },
  {
    lganame: 'ODOGBOLU',
    statename: 'Ogun',
  },
  {
    lganame: 'OGUN WATERSIDE',
    statename: 'Ogun',
  },
  {
    lganame: 'REMO NORTH',
    statename: 'Ogun',
  },
  {
    lganame: 'SAGAMU',
    statename: 'Ogun',
  },
  {
    lganame: 'AKOKO NORTH-WEST',
    statename: 'Ondo',
  },
  {
    lganame: 'AKOKO SOUTH-EAST',
    statename: 'Ondo',
  },
  {
    lganame: 'AKURE NORTH',
    statename: 'Ondo',
  },
  {
    lganame: 'ESE ODO',
    statename: 'Ondo',
  },
  {
    lganame: 'IDANRE',
    statename: 'Ondo',
  },
  {
    lganame: 'IFEDORE',
    statename: 'Ondo',
  },
  {
    lganame: 'ILAJE',
    statename: 'Ondo',
  },
  {
    lganame: 'ILE OLUJI/OKEIGBO',
    statename: 'Ondo',
  },
  {
    lganame: 'IRELE',
    statename: 'Ondo',
  },
  {
    lganame: 'ODIGBO',
    statename: 'Ondo',
  },
  {
    lganame: 'OKITIPUPA',
    statename: 'Ondo',
  },
  {
    lganame: 'ONDO EAST',
    statename: 'Ondo',
  },
  {
    lganame: 'ONDO WEST',
    statename: 'Ondo',
  },
  {
    lganame: 'OSE',
    statename: 'Ondo',
  },
  {
    lganame: 'OWO',
    statename: 'Ondo',
  },
  {
    lganame: 'AIYEDAADE',
    statename: 'Osun',
  },
  {
    lganame: 'AIYEDIRE',
    statename: 'Osun',
  },
  {
    lganame: 'ATAKUNMOSA EAST',
    statename: 'Osun',
  },
  {
    lganame: 'ATAKUNMOSA WEST',
    statename: 'Osun',
  },
  {
    lganame: 'BOLUWADURO',
    statename: 'Osun',
  },
  {
    lganame: 'BORIPE',
    statename: 'Osun',
  },
  {
    lganame: 'EDE NORTH',
    statename: 'Osun',
  },
  {
    lganame: 'EDE SOUTH',
    statename: 'Osun',
  },
  {
    lganame: 'EGBEDORE',
    statename: 'Osun',
  },
  {
    lganame: 'EJIGBO',
    statename: 'Osun',
  },
  {
    lganame: 'IFE CENTRAL',
    statename: 'Osun',
  },
  {
    lganame: 'IFEDAYO',
    statename: 'Osun',
  },
  {
    lganame: 'IFELODUN',
    statename: 'Osun',
  },
  {
    lganame: 'IFE NORTH',
    statename: 'Osun',
  },
  {
    lganame: 'IFE SOUTH',
    statename: 'Osun',
  },
  {
    lganame: 'ILA',
    statename: 'Osun',
  },
  {
    lganame: 'ILESA EAST',
    statename: 'Osun',
  },
  {
    lganame: 'IREPODUN',
    statename: 'Osun',
  },
  {
    lganame: 'IREWOLE',
    statename: 'Osun',
  },
  {
    lganame: 'ISOKAN',
    statename: 'Osun',
  },
  {
    lganame: 'IWO',
    statename: 'Osun',
  },
  {
    lganame: 'OBOKUN',
    statename: 'Osun',
  },
  {
    lganame: 'ODO OTIN',
    statename: 'Osun',
  },
  {
    lganame: 'OLA OLUWA',
    statename: 'Osun',
  },
  {
    lganame: 'OLORUNDA',
    statename: 'Osun',
  },
  {
    lganame: 'ORIADE',
    statename: 'Osun',
  },
  {
    lganame: 'OROLU',
    statename: 'Osun',
  },
  {
    lganame: 'OSOGBO',
    statename: 'Osun',
  },
  {
    lganame: 'AFIJIO',
    statename: 'Oyo',
  },
  {
    lganame: 'AKINYELE',
    statename: 'Oyo',
  },
  {
    lganame: 'ATIBA',
    statename: 'Oyo',
  },
  {
    lganame: 'ATISBO',
    statename: 'Oyo',
  },
  {
    lganame: 'EGBEDA',
    statename: 'Oyo',
  },
  {
    lganame: 'IBADAN NORTH',
    statename: 'Oyo',
  },
  {
    lganame: 'IBARAPA CENTRAL',
    statename: 'Oyo',
  },
  {
    lganame: 'IBARAPA NORTH',
    statename: 'Oyo',
  },
  {
    lganame: 'IDO',
    statename: 'Oyo',
  },
  {
    lganame: 'IREPO',
    statename: 'Oyo',
  },
  {
    lganame: 'ISEYIN',
    statename: 'Oyo',
  },
  {
    lganame: 'ITESIWAJU',
    statename: 'Oyo',
  },
  {
    lganame: 'IWAJOWA',
    statename: 'Oyo',
  },
  {
    lganame: 'KAJOLA',
    statename: 'Oyo',
  },
  {
    lganame: 'LAGELU',
    statename: 'Oyo',
  },
  {
    lganame: 'OGBOMOSHO NORTH',
    statename: 'Oyo',
  },
  {
    lganame: 'OGBOMOSHO SOUTH',
    statename: 'Oyo',
  },
  {
    lganame: 'ONA ARA',
    statename: 'Oyo',
  },
  {
    lganame: 'ORELOPE',
    statename: 'Oyo',
  },
  {
    lganame: 'ORI IRE',
    statename: 'Oyo',
  },
  {
    lganame: 'OYO WEST',
    statename: 'Oyo',
  },
  {
    lganame: 'SAKI EAST',
    statename: 'Oyo',
  },
  {
    lganame: 'SAKI WEST',
    statename: 'Oyo',
  },
  {
    lganame: 'SURULERE',
    statename: 'Oyo',
  },
  {
    lganame: 'BARKIN LADI',
    statename: 'Plateau',
  },
  {
    lganame: 'BASSA',
    statename: 'Plateau',
  },
  {
    lganame: 'BOKKOS',
    statename: 'Plateau',
  },
  {
    lganame: 'JOS EAST',
    statename: 'Plateau',
  },
  {
    lganame: 'JOS NORTH',
    statename: 'Plateau',
  },
  {
    lganame: 'JOS SOUTH',
    statename: 'Plateau',
  },
  {
    lganame: 'KANAM',
    statename: 'Plateau',
  },
  {
    lganame: 'KANKE',
    statename: 'Plateau',
  },
  {
    lganame: 'LANGTANG NORTH',
    statename: 'Plateau',
  },
  {
    lganame: 'LANGTANG SOUTH',
    statename: 'Plateau',
  },
  {
    lganame: 'MANGU',
    statename: 'Plateau',
  },
  {
    lganame: 'MIKANG',
    statename: 'Plateau',
  },
  {
    lganame: 'PANKSHIN',
    statename: 'Plateau',
  },
  {
    lganame: "QUA'AN PAN",
    statename: 'Plateau',
  },
  {
    lganame: 'RIYOM',
    statename: 'Plateau',
  },
  {
    lganame: 'SHENDAM',
    statename: 'Plateau',
  },
  {
    lganame: 'WASE',
    statename: 'Plateau',
  },
  {
    lganame: 'ABUA-ODUAL',
    statename: 'Rivers',
  },
  {
    lganame: 'AHOADA WEST',
    statename: 'Rivers',
  },
  {
    lganame: 'AKUKU-TORU',
    statename: 'Rivers',
  },
  {
    lganame: 'ANDONI',
    statename: 'Rivers',
  },
  {
    lganame: 'ASARI-TORU',
    statename: 'Rivers',
  },
  {
    lganame: 'BONNY',
    statename: 'Rivers',
  },
  {
    lganame: 'DEGEMA',
    statename: 'Rivers',
  },
  {
    lganame: 'ELEME',
    statename: 'Rivers',
  },
  {
    lganame: 'EMOHUA',
    statename: 'Rivers',
  },
  {
    lganame: 'ETCHE',
    statename: 'Rivers',
  },
  {
    lganame: 'GOKANA',
    statename: 'Rivers',
  },
  {
    lganame: 'IKWERRE',
    statename: 'Rivers',
  },
  {
    lganame: 'KHANA',
    statename: 'Rivers',
  },
  {
    lganame: 'OBIO/AKPOR',
    statename: 'Rivers',
  },
  {
    lganame: 'OGBA/EGBEMA/NDONI',
    statename: 'Rivers',
  },
  {
    lganame: 'OGU-BOLO',
    statename: 'Rivers',
  },
  {
    lganame: 'OKRIKA',
    statename: 'Rivers',
  },
  {
    lganame: 'OMUMA',
    statename: 'Rivers',
  },
  {
    lganame: 'OPOBO/NKORO',
    statename: 'Rivers',
  },
  {
    lganame: 'OYIGBO',
    statename: 'Rivers',
  },
  {
    lganame: 'PORT HARCOURT',
    statename: 'Rivers',
  },
  {
    lganame: 'TAI',
    statename: 'Rivers',
  },
  {
    lganame: 'BINJI',
    statename: 'Sokoto',
  },
  {
    lganame: 'BODINGA',
    statename: 'Sokoto',
  },
  {
    lganame: 'DANGE SHUNI',
    statename: 'Sokoto',
  },
  {
    lganame: 'GADA',
    statename: 'Sokoto',
  },
  {
    lganame: 'GORONYO',
    statename: 'Sokoto',
  },
  {
    lganame: 'GUDU',
    statename: 'Sokoto',
  },
  {
    lganame: 'GWADABAWA',
    statename: 'Sokoto',
  },
  {
    lganame: 'ILLELA',
    statename: 'Sokoto',
  },
  {
    lganame: 'ISA',
    statename: 'Sokoto',
  },
  {
    lganame: 'KEBBE',
    statename: 'Sokoto',
  },
  {
    lganame: 'KWARE',
    statename: 'Sokoto',
  },
  {
    lganame: 'RABAH',
    statename: 'Sokoto',
  },
  {
    lganame: 'SABON BIRNI',
    statename: 'Sokoto',
  },
  {
    lganame: 'SHAGARI',
    statename: 'Sokoto',
  },
  {
    lganame: 'SILAME',
    statename: 'Sokoto',
  },
  {
    lganame: 'SOKOTO NORTH',
    statename: 'Sokoto',
  },
  {
    lganame: 'TAMBUWAL',
    statename: 'Sokoto',
  },
  {
    lganame: 'TANGAZA',
    statename: 'Sokoto',
  },
  {
    lganame: 'TURETA',
    statename: 'Sokoto',
  },
  {
    lganame: 'WAMAKO',
    statename: 'Sokoto',
  },
  {
    lganame: 'WURNO',
    statename: 'Sokoto',
  },
  {
    lganame: 'YABO',
    statename: 'Sokoto',
  },
  {
    lganame: 'JALINGO',
    statename: 'Taraba',
  },
  {
    lganame: 'KARIM LAMIDO',
    statename: 'Taraba',
  },
  {
    lganame: 'BADE',
    statename: 'Yobe',
  },
  {
    lganame: 'DAMATURU',
    statename: 'Yobe',
  },
  {
    lganame: 'NGURU',
    statename: 'Yobe',
  },
  {
    lganame: 'ANKA',
    statename: 'Zamfara',
  },
  {
    lganame: 'GUSAU',
    statename: 'Zamfara',
  },
  {
    lganame: 'AGUATA',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'ANAMBRA EAST',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'ANAMBRA WEST',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'ANAOCHA',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'AWKA NORTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'AWKA SOUTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'AYAMELUM',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'DUNUKOFIA',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'EKWUSIGO',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'IDEMILI NORTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'IDEMILI SOUTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'IHIALA',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'NJIKOKA',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'NNEWI NORTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'NNEWI SOUTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'OGBARU',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'ONITSHA NORTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'ONITSHA SOUTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'ORUMBA NORTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'ORUMBA SOUTH',
    statename: 'ANAMBRA',
  },
  {
    lganame: 'OYI',
    statename: 'ANAMBRA',
  },
];

export function useStateAndLga(stateName: string) {
  const [states, _] = useState(data.map(d => d.statename));
  const [lgas, setLgas] = useState<string[]>([]);

  useEffect(() => {
    if (stateName) {
      setLgas(data.filter(s => s.statename === stateName).map(s => s.lganame));
    }
  }, [stateName]);

  const state = new Set(states);

  return {
    states: Array.from(state),
    lgas,
  };
}
