-- CreateTable
CREATE TABLE "continent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "continent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "iso_code" CHAR(3) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "continent_id" INTEGER,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "country_iso_code_key" ON "country"("iso_code");

INSERT INTO continent(id, name) VALUES
(1, 'Africa'),
(2, 'Asia'),
(3, 'Europe'),
(4, 'North America'),
(5, 'Oceania'),
(6, 'South America'),
(7, 'Antarctica');

INSERT INTO country (id, name, iso_code ) VALUES
(1, 'Afghanistan', 'AFG'),
(2, 'Albania', 'ALB'),
(3, 'Algeria', 'DZA'),
(4, 'American Samoa', 'ASM'),
(5, 'Andorra', 'AND'),
(6, 'Angola', 'AGO'),
(7, 'Anguilla', 'AIA'),
(8, 'Antarctica', 'ATA'),
(9, 'Antigua and Barbuda', 'ATG'),
(10, 'Argentina', 'ARG'),
(11, 'Armenia', 'ARM'),
(12, 'Aruba', 'ABW'),
(13, 'Australia', 'AUS'),
(14, 'Austria', 'AUT'),
(15, 'Azerbaijan', 'AZE'),
(16, 'Bahamas', 'BHS'),
(17, 'Bahrain', 'BHR'),
(18, 'Bangladesh', 'BGD'),
(19, 'Barbados', 'BRB'),
(20, 'Belarus', 'BLR'),
(21, 'Belgium', 'BEL'),
(22, 'Belize', 'BLZ'),
(23, 'Benin', 'BEN'),
(24, 'Bermuda', 'BMU'),
(25, 'Bhutan', 'BTN'),
(26, 'Bolivia', 'BOL'),
(27, 'Bosnia and Herzegovina', 'BIH'),
(28, 'Botswana', 'BWA'),
(29, 'Bouvet Island', 'BVT'),
(30, 'Brazil', 'BRA'),
(31, 'British Indian Ocean Territory', 'IOT'),
(32, 'Brunei Darussalam', 'BRN'),
(33, 'Bulgaria', 'BGR'),
(34, 'Burkina Faso', 'BFA'),
(35, 'Burundi', 'BDI'),
(36, 'Cambodia', 'KHM'),
(37, 'Cameroon', 'CMR'),
(38, 'Canada', 'CAN'),
(39, 'Cape Verde', 'CPV'),
(40, 'Cayman Islands', 'CYM'),
(41, 'Central African Republic', 'CAF'),
(42, 'Chad', 'TCD'),
(43, 'Chile', 'CHL'),
(44, 'China', 'CHN'),
(45, 'Christmas Island', 'CXR'),
(46, 'Cocos (Keeling) Islands', 'CCK'),
(47, 'Colombia', 'COL'),
(48, 'Comoros', 'COM'),
(49, 'Congo', 'COG'),
(50, 'Congo, the Democratic Republic of the', 'COD'),
(51, 'Cook Islands', 'COK'),
(52, 'Costa Rica', 'CRI'),
(53, 'Cote D''Ivoire', 'CIV'),
(54, 'Croatia', 'HRV'),
(55, 'Cuba', 'CUB'),
(56, 'Cyprus', 'CYP'),
(57, 'Czech Republic', 'CZE'),
(58, 'Denmark', 'DNK'),
(59, 'Djibouti', 'DJI'),
(60, 'Dominica', 'DMA'),
(61, 'Dominican Republic', 'DOM'),
(62, 'Ecuador', 'ECU'),
(63, 'Egypt', 'EGY'),
(64, 'El Salvador', 'SLV'),
(65, 'Equatorial Guinea', 'GNQ'),
(66, 'Eritrea', 'ERI'),
(67, 'Estonia', 'EST'),
(68, 'Ethiopia', 'ETH'),
(69, 'Falkland Islands (Malvinas)', 'FLK'),
(70, 'Faroe Islands', 'FRO'),
(71, 'Fiji', 'FJI'),
(72, 'Finland', 'FIN'),
(73, 'France', 'FRA'),
(74, 'French Guiana', 'GUF'),
(75, 'French Polynesia', 'PYF'),
(76, 'French Southern Territories', 'ATF'),
(77, 'Gabon', 'GAB'),
(78, 'Gambia', 'GMB'),
(79, 'Georgia', 'GEO'),
(80, 'Germany', 'DEU'),
(81, 'Ghana', 'GHA'),
(82, 'Gibraltar', 'GIB'),
(83, 'Greece', 'GRC'),
(84, 'Greenland', 'GRL'),
(85, 'Grenada', 'GRD'),
(86, 'Guadeloupe', 'GLP'),
(87, 'Guam', 'GUM'),
(88, 'Guatemala', 'GTM'),
(89, 'Guinea', 'GIN'),
(90, 'Guinea-Bissau', 'GNB'),
(91, 'Guyana', 'GUY'),
(92, 'Haiti', 'HTI'),
(93, 'Heard Island and Mcdonald Islands', 'HMD'),
(94, 'Holy See (Vatican City State)', 'VAT'),
(95, 'Honduras', 'HND'),
(96, 'Hong Kong', 'HKG'),
(97, 'Hungary', 'HUN'),
(98, 'Iceland', 'ISL'),
(99, 'India', 'IND'),
(100, 'Indonesia', 'IDN'),
(101, 'Iran', 'IRN'),
(102, 'Iraq', 'IRQ'),
(103, 'Ireland', 'IRL'),
(104, 'Israel', 'ISR'),
(105, 'Italy', 'ITA'),
(106, 'Jamaica', 'JAM'),
(107, 'Japan', 'JPN'),
(108, 'Jordan', 'JOR'),
(109, 'Kazakhstan', 'KAZ'),
(110, 'Kenya', 'KEN'),
(111, 'Kiribati', 'KIR'),
(112, 'North Korea', 'PRK'),
(113, 'South Korea', 'KOR'),
(114, 'Kuwait', 'KWT'),
(115, 'Kyrgyzstan', 'KGZ'),
(116, 'Laos', 'LAO'),
(117, 'Latvia', 'LVA'),
(118, 'Lebanon', 'LBN'),
(119, 'Lesotho', 'LSO'),
(120, 'Liberia', 'LBR'),
(121, 'Libyan Arab Jamahiriya', 'LBY'),
(122, 'Liechtenstein', 'LIE'),
(123, 'Lithuania', 'LTU'),
(124, 'Luxembourg', 'LUX'),
(125, 'Macao', 'MAC'),
(126, 'North Macedonia', 'MKD'),
(127, 'Madagascar', 'MDG'),
(128, 'Malawi', 'MWI'),
(129, 'Malaysia', 'MYS'),
(130, 'Maldives', 'MDV'),
(131, 'Mali', 'MLI'),
(132, 'Malta', 'MLT'),
(133, 'Marshall Islands', 'MHL'),
(134, 'Martinique', 'MTQ'),
(135, 'Mauritania', 'MRT'),
(136, 'Mauritius', 'MUS'),
(137, 'Mayotte', 'MYT'),
(138, 'Mexico', 'MEX'),
(139, 'Micronesia, Federated States of', 'FSM'),
(140, 'Moldova', 'MDA'),
(141, 'Monaco', 'MCO'),
(142, 'Mongolia', 'MNG'),
(143, 'Montserrat', 'MSR'),
(144, 'Morocco', 'MAR'),
(145, 'Mozambique', 'MOZ'),
(146, 'Myanmar', 'MMR'),
(147, 'Namibia', 'NAM'),
(148, 'Nauru', 'NRU'),
(149, 'Nepal', 'NPL'),
(150, 'Netherlands', 'NLD'),
(151, 'Netherlands Antilles', 'ANT'),
(152, 'New Caledonia', 'NCL'),
(153, 'New Zealand', 'NZL'),
(154, 'Nicaragua', 'NIC'),
(155, 'Niger', 'NER'),
(156, 'Nigeria', 'NGA'),
(157, 'Niue', 'NIU'),
(158, 'Norfolk Island', 'NFK'),
(159, 'Northern Mariana Islands', 'MNP'),
(160, 'Norway', 'NOR'),
(161, 'Oman', 'OMN'),
(162, 'Pakistan', 'PAK'),
(163, 'Palau', 'PLW'),
(164, 'Palestine', 'PSE'),
(165, 'Panama', 'PAN'),
(166, 'Papua New Guinea', 'PNG'),
(167, 'Paraguay', 'PRY'),
(168, 'Peru', 'PER'),
(169, 'Philippines', 'PHL'),
(170, 'Pitcairn', 'PCN'),
(171, 'Poland', 'POL'),
(172, 'Portugal', 'PRT'),
(173, 'Puerto Rico', 'PRI'),
(174, 'Qatar', 'QAT'),
(175, 'Reunion', 'REU'),
(176, 'Romania', 'ROU'),
(177, 'Russian Federation', 'RUS'),
(178, 'Rwanda', 'RWA'),
(179, 'Saint Helena', 'SHN'),
(180, 'Saint Kitts and Nevis', 'KNA'),
(181, 'Saint Lucia', 'LCA'),
(182, 'Saint Pierre and Miquelon', 'SPM'),
(183, 'Saint Vincent and the Grenadines', 'VCT'),
(184, 'Samoa', 'WSM'),
(185, 'San Marino', 'SMR'),
(186, 'Sao Tome and Principe', 'STP'),
(187, 'Saudi Arabia', 'SAU'),
(188, 'Senegal', 'SEN'),
(189, 'Serbia', 'SRB'),
(190, 'Seychelles', 'SYC'),
(191, 'Sierra Leone', 'SLE'),
(192, 'Singapore', 'SGP'),
(193, 'Slovakia', 'SVK'),
(194, 'Slovenia', 'SVN'),
(195, 'Solomon Islands', 'SLB'),
(196, 'Somalia', 'SOM'),
(197, 'South Africa', 'ZAF'),
(198, 'South Georgia and the South Sandwich Islands', 'SGS'),
(199, 'Spain', 'ESP'),
(200, 'Sri Lanka', 'LKA'),
(201, 'Sudan', 'SDN'),
(202, 'Suriname', 'SUR'),
(203, 'Svalbard and Jan Mayen', 'SJM'),
(204, 'Swaziland', 'SWZ'),
(205, 'Sweden', 'SWE'),
(206, 'Switzerland', 'CHE'),
(207, 'Syria', 'SYR'),
(208, 'Taiwan', 'TWN'),
(209, 'Tajikistan', 'TJK'),
(210, 'Tanzania', 'TZA'),
(211, 'Thailand', 'THA'),
(212, 'Timor-Leste', 'TLS'),
(213, 'Togo', 'TGO'),
(214, 'Tokelau', 'TKL'),
(215, 'Tonga', 'TON'),
(216, 'Trinidad and Tobago', 'TTO'),
(217, 'Tunisia', 'TUN'),
(218, 'Türkiye', 'TUR'),
(219, 'Turkmenistan', 'TKM'),
(220, 'Turks and Caicos Islands', 'TCA'),
(221, 'Tuvalu', 'TUV'),
(222, 'Uganda', 'UGA'),
(223, 'Ukraine', 'UKR'),
(224, 'United Arab Emirates', 'ARE'),
(225, 'United Kingdom', 'GBR'),
(226, 'United States', 'USA'),
(227, 'United States Minor Outlying Islands', 'UMI'),
(228, 'Uruguay', 'URY'),
(229, 'Uzbekistan', 'UZB'),
(230, 'Vanuatu', 'VUT'),
(231, 'Venezuela', 'VEN'),
(232, 'Viet Nam', 'VNM'),
(233, 'Virgin Islands, British', 'VGB'),
(234, 'Virgin Islands, U.S.', 'VIR'),
(235, 'Wallis and Futuna', 'WLF'),
(236, 'Western Sahara', 'ESH'),
(237, 'Yemen', 'YEM'),
(238, 'Zambia', 'ZMB'),
(239, 'Zimbabwe', 'ZWE'),
(240, 'Montenegro', 'MNE'),
(241, 'Kosovo', 'XKX'),
(242, 'Aland Islands', 'ALA'),
(243, 'Bonaire, Sint Eustatius and Saba', 'BES'),
(244, 'Curacao', 'CUW'),
(245, 'Guernsey', 'GGY'),
(246, 'Isle of Man', 'IMN'),
(247, 'Jersey', 'JEY'),
(248, 'Saint Barthelemy', 'BLM'),
(249, 'Saint Martin', 'MAF'),
(250, 'Sint Maarten', 'SXM'),
(251, 'South Sudan', 'SSD');

UPDATE country c
SET continent_id = 1 -- Africa
WHERE c.name IN (
'Algeria', 'Angola', 'Benin', 'Botswana', 'British Indian Ocean Territory', 'Burkina Faso', 'Burundi', 'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Cote D''Ivoire', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Mayotte', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Reunion', 'Rwanda', 'Saint Helena', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Swaziland', 'Tanzania', 'Congo, the Democratic Republic of the', 'Togo', 'Tunisia', 'Uganda', 'Western Sahara', 'Zambia', 'Zimbabwe'
);

UPDATE country c
SET continent_id = 2 -- Asia
WHERE c.name IN (
'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei Darussalam', 'Cambodia', 'China', 'Cyprus', 'East Timor', 'Timor-Leste', 'Georgia', 'Hong Kong', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Macao', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Turkey', 'Türkiye', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Viet Nam', 'Yemen'
);

UPDATE country c
SET continent_id = 3 -- Europe
WHERE c.name IN (
'Aland Islands', 'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark', 'England', 'Estonia', 'Faroe Islands', 'Finland', 'France', 'Germany', 'Gibraltar', 'Greece', 'Guernsey', 'Holy See (Vatican City State)', 'Hungary', 'Iceland', 'Ireland', 'Isle of Man', 'Italy', 'Jersey', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'North Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Northern Ireland', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation', 'San Marino', 'Scotland', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Svalbard and Jan Mayen', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom', 'Wales'
);


UPDATE country c
SET continent_id = 4 -- North America
WHERE c.name IN (
'Anguilla', 'Antigua and Barbuda', 'Aruba', 'Bahamas', 'Barbados', 'Belize', 'Bermuda', 'Canada', 'Cayman Islands', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 'Greenland', 'Grenada', 'Guadeloupe', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Martinique', 'Mexico', 'Montserrat', 'Netherlands Antilles', 'Nicaragua', 'Panama', 'Puerto Rico', 'Saint Barthelemy', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Sint Maarten', 'Trinidad and Tobago', 'Turks and Caicos Islands', 'United States', 'Virgin Islands, British', 'Virgin Islands, U.S.'
);

UPDATE country c
SET continent_id = 5
WHERE c.name IN (
'American Samoa', 'Australia', 'Christmas Island', 'Cocos (Keeling) Islands', 'Cook Islands', 'Fiji', 'French Polynesia', 'Guam', 'Kiribati', 'Marshall Islands', 'Micronesia, Federated States of', 'Nauru', 'New Caledonia', 'New Zealand', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Palau', 'Papua New Guinea', 'Pitcairn', 'Samoa', 'Solomon Islands', 'Tokelau', 'Tonga', 'Tuvalu', 'United States Minor Outlying Islands', 'Vanuatu', 'Wallis and Futuna'
);

UPDATE country c
SET continent_id = 6 -- South America
WHERE c.name IN (
'Argentina', 'Bolivia', 'Bonaire, Sint Eustatius and Saba', 'Brazil', 'Chile', 'Colombia', 'Curacao', 'Ecuador', 'Falkland Islands (Malvinas)', 'French Guiana', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela',
'South Georgia and the South Sandwich Islands'
);

UPDATE country c
SET continent_id = 7
WHERE c.name IN (
'Antarctica', 'Bouvet Island',
'French Southern Territories',
'Heard Island and Mcdonald Islands'
);

-- AlterTable
ALTER TABLE "country" ALTER COLUMN "continent_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "country" ADD CONSTRAINT "country_continent_id_fkey" FOREIGN KEY ("continent_id") REFERENCES "continent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
