import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let loantypes=[
  {type: "General Working Capital"},
  {type: "Farm Management"},
  {type: "Vehicles& Machinery"},
  {type: "Warehouse Receipts"},
  {type: "Land"},
  {type: "Horticulture"},
  {type: "Husbandary & Fishery"},
  {type: "Irrigation"},
  {type: "SHG"},
];
let loans = [
  {
    id:1,
    name: "Mahabank Kisan Credit Card (MKCC)",
    purpose: "Working capital for Cultivation of cropsPost harvest Expenses.Consumption requirements of farmer householdMaintenance of farm equipmentsWorking capital for allied agricultural activities",
    
    elig:"All farmers- Individual / Joint landholdersTenant Farmers, Share Croppers, Oral LesseesSHG's/JLG's of farmers",
      
    amount: "-",
    margin: "NIL as margin is considered while fixing Scale of Finance",
    rof:"Presently as per Govt. of India guidelines : Limit up to Rs3.00 lakhs:  @7% p.a. (fixed) under interest subvention  scheme up to one year  Limit above Rs 3.00 lakhs: Rs.3.00 Lakh to Rs.10.00 lakh : 1 Year MCLR + BSS@0.50% + 2.00%     Above Rs.10.00 lakh                : 1 Year MCLR +BSS@0.50%+ 3.00% ",
    
    security:"Limit Up to Rs 1.60 lakh :1)Hypothecation of CropsLimit Above Rs 1.60 lakh:1) Hypothecation of Crops&2)Third Party Guarantee/Mortgage of Land",
    repayment:"Kharif- Next March, Rabi- Next June, Horticultural crops- Next September",
    
    docs:"1.Loan application ie Form No -138, Enclosure – B2  All 7/12, 8 A, 6 D extracts, Chatu Sima of the applicant. No dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgaged 2. Guarantee form F-138All 7/12, 8 A & PACS dues certificate of the guarantors",
    
    link:"https://bomloans.com/agriloan?bom",
    type:"General Working Capital",
  },
  {
    id:2,
    name: "Mahabank Kisan All Purpose Term Loan",
  
    purpose: "To create hassle free single term loan limit to farmer for all term loan requirements excluding development projects with long gestation periods (more than 3-4 years)",
    elig:
      "Individuals, Joint/ Group of farmers- owner cultivators & JLG’s/SHG’s engaged in agriculture & allied activities",
    amount: "Term Loan (TL)",
    margin: "Limit up to Rs 1.60 Lakh- NILLimit above Rs 1.60 Lakh-15% to 25%  (Depending upon purpose & quantum of finance)",
    rof:"Up to Rs.10.00 lakh : 1 Year MCLR + BSS@0.50% + 2.00% Above Rs.10.00 lakh  : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"Up to Rs 1.60 lakh- Hypothecation of assets created out of bank financeAbove Rs 1.60 lakh (aggregate limit)- Mortgage of land, value thereof shall be at least 200% of limit sanctioned",
    repayment:"Repayable within 9 years maximum in suitable installments coinciding overall income generation of the farmer, without linking to individual projects.",
    docs:"dsa",
    link:"https://bomloans.com/agriloan?bom",
    type:"General Working Capital",
  },
  {
    id:3, 
    name: "Mahabank Gold Loan Scheme - Agriculture",
    purpose: "To enable farmer to quickly meet their agricultural credit needs i.e both crop production / cash credit for allied agricultural activities & investment credit",
    elig:
      "Any person engaged in agriculture or allied activities. The applicant should satisfy the KYC guidelines",
    amount: "A]   i) MKCC against Gold- As per Scale of Finance of crops ii) Agri Cash Credit against Gold - As per actual credit    requirement B]   Agricultural Term Loan- As per actual credit requirement",
    margin: "Minimum 25 % of market value of Gold (for MKCC & Agri Cash Credit against Gold) & Minimum 30 % of market value of Gold (For Term Loan against Gold)",
    rof:"MKCC: 7% p.a. (fixed) upto Rs 3.00 lakh under interest subvention scheme upto one year.Cash credit for allied activities: @ 1 Month MCLR i.e. 8.30%Term Loans: @ 1 Month MCLR i.e. 8.30%",
    security:"Pledge of Gold jewelry/ ornaments. Bank shall not grant any advance against bullion/ primary gold.",
    repayment:"MKCC against Gold- As per MKCC scheme guidelinesCC allied activities- Annual reviewTL- Within 60 months depending upon the purpose",
    docs:" Loan application , KYC Documents, 7/12 Extract",
    link:"https://bomloans.com/agriloan?bom",
    type:"General Working Capital",
  },
  {
    id:4,
    name: "Scheme for construction of farmhouse to Agriculturists",
    purpose: "Construction of farmhouse on agricultural land to facilitate farmers to have dwelling unit at farm which may also take care of other requirement such as storage of agriculture produce & farm implements, cattle shed, drying yard etc. for effective supervision and farm management.",
    elig:
    
      "Person/s engaged (singly or jointly) in agriculture and allied activities.Farmers having minimum irrigated land holding of 2.5 acresFarmers having sufficient disposable income from his own farm as well as from other sources.Existing borrowers having good track record for the past 3 years with the Bank and new borrowers who have not availed any agriculture loan facilities from any bank / financial institutions.Multiple banking not allowed.",
    amount: "Rs. 2.00 lakh upto Rs. 10.00 lakh: - Farmer/s having perennially irrigated land holding of minimum 2.5 acres with sufficient disposable income from his own farm, allied activities as well as from other sources.Rs. 10.00 lakh upto Rs. 50.00 lakh: - Farmer/s having perennially irrigated land holding of minimum 5 acres with sufficient disposable income from his own farm, allied activities as well as from other sources.",
    margin: "Minimum 25 % of construction cost of proposed farmhouse.",
    rof:"Up to Rs.10.00 lakh     : 1 Year MCLR + BSS@0.50% + 2.00% ,Above Rs.10.00 lakh    : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"Registered Mortgage of Agril. Land/s * & Farm House constructed thereon.Hypothecation of standing crop, other movable assets etc.Two acceptable guarantors having adequate Net Worth* In case landed property cannot be mortgaged for some reasons, NSC, FDR (of our Bank), Government security or such acceptable security with Margin @ 25 % may be taken as security. Security in the form of Shares shall not be accepted.",
    repayment:"Moratorium period may be allowed upto 18 months or completion of the construction which is earlie Repayment:The entire loan along with interest shall be repaid in yearly / half yearly / quarterly / monthly instalments along with interest within a period of 15 years including moratorium period. The repayment shall be linked to harvesting season of the main / cash crop / income generation cycle of the activity.",
    docs:"Loan application ie Form No -138, & Enclosure – B2 All 7/12, 8 A, 6 D extracts, Chatu Sima of the applicantIn case of Co-Applicant is salaried or businessmen, the latest salary slips / ITR / Form 16 / Balance Sheet & P/L stamentsNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel where land is to be mortgaged for 30 yearsPrice quotations/ Plan estimates / Permissions / Lay out etc.Valuation Certificate from Registar / Sub – Registar of the area Guarantee form F-138  All 7/12, 8 A & PACS dues certificate of the guarantorsIn case of Guarantor is salaried or businessmen, the latest salary slips / ITR / Form 16 / Balance Sheet & P/L",
    link:"https://bomloans.com/agriloan?bom",
    type:"Farm Management",
  },
  {
    id:5,
    name: "Scheme for financing farmers for Purchase of Vehicles (Two / Three Wheelers)",
    purpose: "Purchase of brand new vehicles such as Two Wheelers, Three Wheeler Carriages ( Including Electric vehicles ) for supervising agriculture operations / effective management of farm / estate and for transportation of agricultural produce / inputs, labour, etc.",
    elig:
    
      "The applicant/s should be an agriculturist, cultivating his own land or should be engaged in allied activities such as Dairy, Poultry, sericulture, fisheries etc.The persons engaged in production and distribution of agricultural and allied activity inputs.The applicant/s should possess a valid driving license or engage driver possessing valid driving license.Age Limit:For individuals: 18 years and above.Maximum Age at Maturity of loan should not exceed 70 years.",
    amount: "Maximum Rs. 2 Lakh",
    margin: "Minimum 25% of the cost of Vehicle (i.e. Ex Showroom price + RTO Charges + Insurance Charges)",
    rof:"1 Year MCLR + 3.15 % P.A.",
    security:"Loan amount upto Rs. 1.60 lakh Hypothecation of Vehicle. Loan amount above Rs. 1.60 lakh Hypothecation of VehicleMortgage of Land / Third Party Guarantee",
    repayment:"The entire loan along with interest shall be repaid within a period of 5-7 years. The repayment would be monthly / quarterly / half- yearly / yearly instalments depending upon generation of income / cash flow.The repayment shall be linked to harvesting season of the main / cash crop / income generation cycle of the activity.",
    docs:"Loan application ie Form No -138, & Enclosure – B2 All 7/12, 8 A, 6 D extracts of the applicantIn case of Co-Applicant is salaried or businessmen, the latest salary slips / ITR / Form 16 / Balance Sheet & P/L stamentsNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel where land is to be mortgaged for 30 yearsPrice quotations of Vehicle from Authorized Dealers.Valuation Certificate from Registar / Sub – Registar of the area Guarantee form F-138 All 7/12, 8 A & PACS dues certificate of the guarantorsIn case of Guarantor is salaried or businessmen, the latest salary slips / ITR / Form 16 / Balance Sheet & P/L",
    link:"https://bomloans.com/agriloan?bom",
    type:"Vehicles& Machinery",
  },
  {
    id:6,
    name: "Scheme for financing farmers for Purchase of Vehicles (Four Wheelers)",
    purpose: "Purchase of brand new vehicle (four-wheeler) including Car, Jeep, Pick-ups, SUVs, Multi Utility Vehicles (MUVs), Rural Transport Vehicles,( including Electric Vehicles) etc., for supervising agricultural operations / effective management of farm / estate and for transportation of agricultural produce / inputs, labours, etc.",
    elig:"The applicant/s should be an agriculturist, cultivating his own land or should be engaged in allied activities such as Dairy, Poultry, sericulture, fisheries etc.The persons engaged in production and distribution of agricultural and allied activity inputs.The applicant/s should possess a valid driving license or engage driver possessing valid driving license.Age Limit: For individuals: 18 years and above.Maximum Age at Maturity of loan should not exceed 70 years.",
    amount: "	Maximum Rs. 20.00 Lakh",
    margin: "Minimum 15% of the cost of Vehicle (i.e. Ex Showroom price + RTO Charges + Insurance Charges)",
    rof:"1 year MCLR +0.25 % P.A.",
    security:"Loan amount upto Rs. 1.60 lakh Hypothecation of Vehicle. Loan amount above Rs. 1.60 lakh Hypothecation of VehicleMortgage of Land / Third Party Guarantee",
    repayment:"The entire loan along with interest shall be repaid within a period of 5-7 years. The repayment would be monthly / quarterly / half- yearly / yearly instalments depending upon generation of income / cash flow.The repayment shall be linked to harvesting season of the main / cash crop / income generation cycle of the activity.",
    docs:"Loan application ie Form No -138, & Enclosure – B2 All 7/12, 8 A, 6 D extracts of the applicantIn case of Co-Applicant is salaried or businessmen, the latest salary slips / ITR / Form 16 / Balance Sheet & P/L stamentsNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel where land is to be mortgaged for 30 yearsPrice quotations of Vehicle from Authorized Dealers.Guarantee form F-138 .All 7/12, 8 A & PACS dues certificate of the guarantorsIn case of Guarantor is salaried or businessmen, the latest salary slips / ITR / Form 16 / Balance Sheet & P/L",
    link:"https://bomloans.com/agriloan?bom",
    type:"Vehicles& Machinery",
  },
  {
    id:7,
    name: "Scheme for Financing against Warehouse Receipts to farmers",
    purpose: "Loan against Negotiable Warehouse Receipts/ eNWR of warehouse/cold storage is available to provide liquidity to the farmers & prevent them from resorting to distress sale of their produce at the time of harvest",
    valuation:
    
      "Market Price or Value shown in warehouse receipt whichever is lower",
    margin: "	25% of the valuation",
    rof:"Aggregate Exposure  Up to Rs.10.00 lakh : 1 Year MCLR + BSS@0.50% + 2.00% Above Rs.10.00 lakh  : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"Loan upto Rs 25.00 lakh: Charge on  Negotiable Warehouse Receipts/ eNWR being endorsed in favour of bank Lien should be noted with concern warehouse Loans above Rs 25.00 lakh: Charge on  Negotiable Warehouse Receipts/ eNWR  being endorsed in favour of bank Lien should be noted with concern warehouseMortgage of land Third party guarantee having sufficient net worth",
    repayment:"	The loan should be liquidated as & when the produce is sold during the interim period not exceeding 12 months",
    link:"https://bankofmaharashtra.in/loan-against-warehouse-receipts-to-farmers",
    type:"Warehouse Receipts",
  },
  {
    id:8,
    name: "Scheme for Financing Farmers for Purchase of Land by Small & Marginal Farmers",
    purpose: "Purchase of land for agricultural purposes",
    elig:
    
      "Small & Marginal Farmers (Who owns maximum of 5 acre of non irrigated land or 2.5 acres of irrigated land including land to be purchased)Share Croppers/tenant farmers cultivating up to 2.5 acres of irrigated land or 5 acres of unirrigated landEntrepreneurs with agricultural background are also eligible (Provided state laws permits purchase of agri lands by non agriculturists)",
    amount: "A. Lower of the 1, 2 & 3 Valuation as assessed by the branch Circle rate fixed by the stat Registration Value plus Stamp duty & registration charges for sale deedMaximum Rs 20.00 Lakh",
    margin: "Margin shall be minimum of 20%.",
    rof:"Up to Rs.10.00 lakh : 1 Year MCLR + BSS@0.50% + 2.00%   Above Rs.10.00 lakh  : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"The land presently owned, if any & also the lands to be purchased out of the bank finance be mortgaged in favour of the bank.Hypothecation of Crops grown from time to time on the land",
    repayment:" to 10 years half yearly / yearly installments including maximum moratorium of 24 months",
    docs:"Copies of land records regarding land owned & to be purchased, certified by concerned revenue authoritiesDocuments of title, Copy of sale agreement, if entered Loan application ie Form No -138, & Enclosure – B2 All 7/12, 8 A, 6 D extracts, Chatu Sima of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgaged Guarantee form F-138  All 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/farmers-loan-for-purchase-of-land",
    type:"Land",
  },
  {
    id:9,
    name: "Financing For Setting Up of Agri-Clinics and Agri-Business Centers for Agriculture Graduates",
    purpose: "Setting up of Agri Clinics ,Setting up of Agri Business Centers",
    elig:
    
      "The scheme is open to following categories of candidates of age group of 18 to 60 yearsGraduates in agriculture and allied subjects from State Agriculture Universities (SAUs)/Central Agricultural Universities/Universities recognized by ICAR/UGC. Degree in Agriculture and allied     subjects offered by other agencies are also considered subject to approval of Department of Agriculture & Cooperation, GoI, on recommendation of the State GovernmentDiploma (with at least 50% marks)/Post Graduate Diploma holders in Agriculture and allied subjects from State Agricultural Universities, State Agriculture and Allied Departments and State Department of Technical Education.Diploma in Agriculture and allied subjects offered by other agencies are also considered subject to approval of Department of Agriculture, Cooperation & Farmers’ Welfare, GoI on recommendation of the State GovernmentBiological Science Graduates with Post Graduation in Agriculture & allied subjectsDegree courses recognised by UGC having more than 60 percent of the course content in Agriculture and allied subjectsDiploma/Post Graduate Diploma courses with more than 60 percent of course content in Agriculture and allied subjects, after B.Sc. with Biological Sciences, from recognised colleges and universities.Agriculture related courses at Intermediate (i.e. plus two) level, with at least 55% marks.",
    amount: "Individuals: Maximum Rs 20 lakh,Group (5 members) : Maximum Rs 100 lakh",
    margin: "Limit up to Rs 5.00 lakh: NILLimit above Rs 5.00 lakh:15% to 25% (However, concessions will be available to SCs / STs, women and beneficiaries of North Eastern states, Hill areas)",
    rof:"Slab-wise ROI for exposures upto Rs.25.00 lakh-  I) For Activities which does not fulfill MSMED Act Norms (MCLR Based): 1 Year MCLR+BSS @ 0.50% + Spread @ 2.10 II) For activities which fulfills MSMED Act Norms (RLLR) Based: Without Collateral Concession : RLLR+ 2.50 + BSS @ 0.50%  Slab-wise ROI for exposures more than Rs.25.00 lakh- As per Risk Base Prising",
    security:"Limit upto Rs 5.00 Lakh: Hypothecation of Assets created out of bank loan Limit above Rs 5.00 Lakh:Hypothecation of Assets created out of bank loan Mortgage of land / other property.",
    repayment:"5 to 10 years depending up on the cash flows ",
    docs:"Loan application ie Form No -138, & Enclosure – B2 All 7/12, 8 A, 6 D extracts, Chatu Sima of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.5.00 lakh where land is to be mortgagedPrice quotations/ Plan estimates / Permissions etc. depending up on the purpose of loan Guarantee form F-138  All 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/financing-for-agriculture-graduates",
    type:"SHG",
  },
  {
    id:10,
    name: "Horticulture / Plantation Activities",
    purpose: "Cultivation of fruit crops-Mango, Pomegranate, Grapes, Guava etc",
    elig:
    "All persons engaged in raising fruit gardens, plantations and nursery crops as owners of land or permanent tenants or as lease holders (for reasonably long period).",
    amount: "As per NABARD/NHB Unit costs/ Project costs",
    margin: "Limit up to Rs 1.60 Lakh- NILLimit above Rs 1.60 Lakh-15% to 25% (Depending upon purpose & quantum of finance)",
    rof:"Up to Rs.10.00 lakh : 1 Year MCLR + BSS@0.50% + 2.00% Above Rs.10.00 lakh  : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"1) Up to Rs 1.60 lakh: Hypothecation of Crops/Plant Machinery to be purchased 2) Above Rs 1.60 lakh : a) Hypothecation of Crops/Plant Machinery to be purchased b) Third Party Guarantee (Two) / Mortgage of land.",
    repayment:"Within 7-15 years including gestation period. Coinciding with harvesting of crops/marketing of produce",
    docs:"Loan application ie Form No -138,&Enclosure – B2 All 7/12, 8 A, 6 D extracts, Chatu Sima of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgagedPrice quotations/ Plan estimates / Permissions etc. depending up on the purpose of loan Guarantee form F-138 All 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/loan-for-plantation-horticulture",
    type:"Horticulture",
  },
  {
    id:11,
    name: "Animal Husbandry",
    purpose: "Purchase of Milch Animals like Cows/Buffaloes etcPurchase of Draft Animals like Bullock /Camel etcPoultry: Broiler / Layers Farm, Hatchery, Feed MillSheep/Goat: RearingConstruction of Byre, Purchase of equipment / machineryWorking Capital Requirements.",
    elig:
    
      "All farmers- Individual / Joint landholdersTenant Farmers, Share Croppers, Oral LesseesSHG’s/JLG’s of farmers(Who have necessary expertise)",
    amount: "Animal: As per NABARD unit costsOthers:As project Cost / Estimates/ Price quotations.",
    margin: "Limit up to Rs 1.60 Lakh- NILLimit above Rs 1.60 Lakh-15% to 25% (Depending upon purpose & quantum of finance)",
    rof:"Up to Rs.10.00 lakh : 1 Year MCLR + BSS@0.50% + 2.00%  Above Rs.10.00 lakh  : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"1) Up to Rs 1.60 lakh: Hypothecation of Animals/Plant Machinery to be purchased 2) Above Rs 1.60 lakh : a) Hypothecation of Animals/Plant Machinery to be purchased b) Third Party Guarantee (Two) / Mortgage of land.",
    repayment:"Within 3 to 7 years with suitable monthly/ quarterly/ half yearly installments",
    docs:"Loan application ie Form No -138,&Enclosure – B2 All 7/12, 8 A, 6 D extracts, Chatu Sima of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgagedPrice quotations/ Plan estimates / Permissions etc. depending up on the purpose of loan Guarantee form F-138 All 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/animal-husbandry",
    type:"Husbandry & Fishery",
  },
  {
    id:12,
    name: "Farm Mechanization",
    purpose: "Purchase of New / Second Hand Tractor (with / without trailer)Purchase of Power TillerPurchase of Combined HarvesterPurchase Power Thresher, Sprayer & Other farm machineries.",
    elig:
    
      "All farmers- Individual / Joint landholders",
    amount: "Maximum Rs.25.00 Lakh",
    margin: "Loan up to Rs.1.60 Lakh : No margin Loan above Rs.1.60 Lakh  New Tractor - 15% (i.e. Ex Showroom price + RTO Charges + Insurance Charges)Second Hand Tractor- 40%Power Tiller- 15%Combined Harvester –15% (i.e. Ex Showroom price + RTO Charges + Insurance Charges)Purchase Power Thresher, Sprayer & Other farm machineries – 25%",
    rof:"New Tractors, Power Tillers, Combine Harvester, etc Loan up to Rs.10 Lakh - 1Year MCLR +BSS @0.50% +1.00% p.a.Loan above Rs.10 Lakh - 1Year MCLR +BSS @0.50% +2.00% p.a.Second Hand Tractors 1Year MCLR +BSS @0.50% +3.00% p.a.",
    security:"Up to Rs 1,60,000: Hypothecation of tractor unit Above Rs 1, 60,000: Hypothecation of tractor unit anThird party guarantee (Two)/Mortgage of land",
    repayment:"	5 to 9 years, depending upon the purpose of loan",
    docs:"Loan application ie Form No -138, & Enclosure – B2 All 7/12, 8 A, 6 D extracts, Chatu Sima of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgagedPrice quotations/ Plan estimates / Permissions etc. depending up on the purpose of loan  Guarantee form F-138 All 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/farm-mechanization",
    type:"Vehicles& Machinery",
  },
  {
    id:13,
    name: "Minor Irrigation",
    purpose: "Sinking a well/ repair or deepening of wellSinking a tube wellInstallation of an electric/ diesel pump setDrip irrigation systemSprinkler irrigation systemLaying irrigation channels/ pipelinesFarm pond/water tankComposite minor irrigation which includes more than one purpose mentioned above",
    elig:
    
      "All farmers- Individual / Joint landholders",
    amount: "For new dug wells/pipeline/pump sets: As per the NABARD Unit costs/ EstimatesFor equipments/machinery: As per price quotations.",
    margin: "Limit up to Rs 1.60 Lakh- NILLimit above Rs 1.60 Lakh-15% to 25% (Depending upon purpose & quantum of finance)",
    rof:"Up to Rs.10.00 lakh : 1 Year MCLR + BSS@0.50% + 2.00%  Above Rs.10.00 lakh  : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"​Limit up to Rs 1.60 Lakh- Hypothecation of Crops, equipment’s, machineries & other assetsLimit above Rs 1.60 Lakh –  a. Hypothecation of Crops, equipment’s, machineries & other assets b. ​Third Party Guarantee/ Mortgage of Land",
    repayment:"7 to 11 years, depending upon the repaying capacity",
    docs:"Loan application ie Form No -138, & Enclosure – B2 All 7/12, 8 A, 6 D extracts, Chatu Sima of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgagedPrice quotations/ Plan estimates / Permissions etc. depending up on the purpose of loan Guarantee form F-138 All 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/minor-irrigation",
    type:"Irrigation",
  },
  {
    id:14,
    name: "Hi-tech Projects",
    purpose: "Hi-tech Agricultural projects (Green House/ Polyhouse /Shed net /Pre Cooling / Cold Storage etc)",
    elig:
    
      "	All farmers- Individual / Joint landholders",
    amount: "	As per the project cost/ estimates",
    margin: "Limit up to Rs 1.60 Lakh- NILLimit above Rs 1.60 Lakh-15% to 25% (Depending upon purpose & quantum of finance)",
    rof:"Up to Rs.10.00 lakh : 1 Year MCLR + BSS@0.50% + 2.00%  Above Rs.10.00 lakh  : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"1) Up to Rs 1.60 lakh: Hypothecation of Crops, equipment, machineries & other assets 2) Above Rs 1.60 lakh : • Hypothecation of  of Crops, equipment, machineries & other assets • Third Party Guarantee/ Mortgage of Land",
    repayment:"Within 5 to 9 years depending upon the cash flows of the activity",
    docs:"Loan application ie Form No -138,&Enclosure – B2 All 7/12, 8 A, 6 D extracts, Chatu Sima of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgagedPrice quotations/ Plan estimates / Permissions etc. depending up on the purpose of loan Guarantee form F-138 All 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/hi-tech-projects",
    type:"Farm Management",
  },
  {
    id:15,
    name: "Financing to Self Help Groups",
    purpose: "I. The loan amount would be distributed among members based on the MCP prepared by the SHGs. The loans may be used by members for meeting social needs, high cost debt swapping, construction or repair of house, construction of toilets and taking up sustainable livelihoods or to finance any viable common activity started by the SHGs.II. In order to facilitate use of loans for augmenting livelihoods of SHG members, at least 50% of loans above ₹1 lakh, 75% of loans above ₹4 lakh and at least 85% of loans above ₹6 lakh should be used primarily for income generating productive purposes. MCPs prepared by SHGs would form the basis for determining the purpose and usage of loans.",
    elig:
    
      "I. SHGs should be in active existence for at least 6 months as per their books of accounts (and not from the date of opening of S/B account). II. SHGs should be practicing ‘Panchasutras’ i.e., regular meetings, regular savings, regular inter-loaning, timely repayment and up-to-date books of accounts.  III. SHGs should qualify as per grading norms fixed by NABARD.(Annexure-7) As and when the federations of the SHGs come into existence, the grading exercise may be done by the federations to support the banks IV. The existing defunct SHGs are also eligible for credit if these are revived and continue to be active for a minimum period of three months.",
    amount: "Minimum loan of Rs. 6 lakhs to each eligible SHG for a period of 3 years with a yearly drawing power (DP). The drawing power may be enhanced annually based on the repayment performance of the SHG.",
    margin: "For loans to SHGs up to ₹10.00 lakh, no collateral and no margin will be obtained. No lien should be marked against savings bank accounts of SHGs and no deposits should be insisted upon while sanctioning loans.For loans to SHGs above ₹10 lakh and up to ₹20 lakh, no collateral should be obtained, and no lien should be marked against savings bank account of SHGs. However, the entire loan (irrespective of the loan outstanding, even if it subsequently goes below ₹10 lakh) would be eligible for coverage under Credit Guarantee Fund for Micro Units (CGFMU).For loan to SHGs above ₹10 lakh and up to ₹20 lakh, a margin not exceeding 10% of the loan amount exceeding ₹10 lakh may be obtained as per the bank’s approved loan policy.",
    repayment:"a. The first dose of loan may be repaid in 24-36 months in monthly/quarterly instalments.  b. The second dose of loan may be repaid in 36-48 months in monthly/quarterly instalments c. The third dose of loan may be repaid in 48-60 months based on the cash flow in monthly/quarterly instalments.d. From the fourth dose onwards loans may be repaid between 60-84 months based on the cash flow in monthly/quarterly installments. ",
    link:"https://bankofmaharashtra.in/financing-to-self-help-groups",
    type:"SHG",
  },
  {
    id:16,
    name: "Mahabank Kisan Credit Card (MKCC) to Animal Husbandry Farmers and Fisheries",
    purpose: "The KCC facility will be extended to meet the short term credit requirements of rearing of animals, birds, fish, shrimps, other aquatic organisms, capture of fish.",
    elig:
    
      "The criteria for eligible beneficiaries under KCC for Animal Husbandry and Fisheries will be as under: 1) Fishery 1.1  Inland Fisheries and Aquaculture 1.1.1  Fishers, Fish Farmers (individual & groups/ partners/ share croppers/ tenant farmers), Self Help Groups, Joint Liability Groups and women groups. 1.1.2 The beneficiaries must own or lease any of the fisheries related activities such as pond, tank, open water bodies, raceway, hatchery, rearing unit, possess necessary license for fish farming and fishing related activities, and any other State specific fisheries and allied activities. 1.2    Marine Fisheries 1.2.1 Beneficiaries listed at 1.1.1 above, who own or lease registered fishing vessel/boat, possess necessary fishing license/permission for fishing in estuary and sea, fish farming / mariculture activities in estuaries and open sea and any other State specific fisheries and allied activities. 2) Poultry and small ruminant 2.1 Farmers, poultry farmers either individual or joint borrower, Joint Liability Groups or Self Help Groups including tenant farmer of sheep/goats/pigs/poultry/birds/rabbit and having owned /rented /leased sheds.  3) Dairy 3.1 Farmers and Dairy farmers either individual or joint borrower, Joint Liability Groups or Self Help Groups including tenant farmers having owned /rented/leased sheds.​",
    margin: " NA (Considered while deciding scale of finance)",
    rof:"Upto Rs.2.00 Lakh : Concessional Rate of Interest @ 7.00 % per annum.Above Rs.2.00 Lakh : Slabwise ROI applicable to Agriculture Advances Rs. 2.00 Lakh to Rs. 10.00 Lakh: 1 year MCLR +BSS @ 0.50%+2.00% Above Rs. 10.00 Lakh: 1 year MCLR +BSS @ 0.50%+3.00%",
    security:"Up to Rs.1.60 lakh :      Hypothecation of stock / Birds/ AnimalsAbove Rs.1.60 lakh: a)  Hypothecation of stock/ Birds/Animals b)  Mortgage of land / Third Party Guarantee",
    repayment:"As per the cash flow / income generation pattern of the activity undertaken by the borrower.Annual reveiew / renewal",
    docs:"Applicant: -Loan application i.e. Form No -138,  &  Enclosure – B2 All 7/12, 8 A, 6 D extracts of the applicantIn case of Co-Applicant is salaried or businessmen, the latest salary slips / ITR / Form 16 / Balance Sheet & P/L statementsNo dues certificates of the applicant from surrounding financial institutions including PACSLease & or Fishing license for fishery.Legal search for 30 years from advocate on Bank’s panel where land is to be mortgaged Guarantor (for loans above Rs.1.60 lakh): -Guarantee form F-138All 7/12, 8 A & PACS dues certificate of the guarantorsIn case of Guarantor is salaried or businessmen, the latest salary slips / ITR / Form 16 / Balance Sheet & P/L",
    link:"https://bankofmaharashtra.in/mkcc-to-animal-husbandry-farmers-fisheries",
    type:"Husbandry & Fishery",
  },
  {
    id:17,
    name: "Mahabank Kisan Tatkal Scheme",
    purpose: "For instant credit for farming community to meet emergency  requirements",
    elig:
    
      "Individual Farmers / Joint borrowers (not exceeding 4 farmers) who are existing KCC holders having satisfactory track record of at least 2 years",
    amount: "Minimum- Rs 5000/-Maximum- Rs 50000/-(Subject to ceiling at 50% of KCC limit / 25% of annual income)",
    margin: "NIL",
    rof:"Aggregate Exposure Up to Rs.10.00 lakh     : 1 Year MCLR + BSS@0.50% + 2.00% Above Rs.10.00 lakh    : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"Existing Security obtained for KCC to be continued.",
    repayment:"3 years in half yearly / yearly installments coinciding with harvest of    the crop",
    docs:" Loan application All 7/12, 8 A, 6 D extracts, Boundaries of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACS",
    link:"https://bankofmaharashtra.in/kisan-tatkal-scheme",
    type:"General Working Capital",
  },
  {
    id:18,
    name: "Scheme for Estate Purchase Loans",
    purpose: "Purchase of estates growing traditional plantation crops viz. coffee, tea, rubber, cardamom, cashew, pepper, coconut etc.",
    elig:
    
      "The purchaser should have yielding estates and should be in a position to rejuvenate the Estate proposed to be purchased.Satisfactory past dealingsExpereineced, Financially sound and able to bring Margin & Service the debtBuyer should qualify respective State Govt normsThe estate should preferably neglected one.Total land holding including the land to be acquired be within the land celing norms of respective state.",
    amount: "Lower of the 1, 2 & 3  Market Value Guidance Value / Circle rate fixed by the state Purchase Consideration after retaining necessary margin plus Stamp duty & registration charges for sale deed Maximum Rs 20.00 Lakh",
    margin: "Margin shall be normally of 50% on purchase consideration or value of the estate, whichever is lower.",
    rof:"Up to Rs.10.00 lakh : 1 Year MCLR + BSS@0.50% + 2.00% Above Rs.10.00 lakh : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"Primary:  1) Mortgage of property to be purchased 2) Hypothecation of Plantation crops raised on the field / estate Collateral: 1) Mortatge of existing landed properties including preferably residential property is to be obtained.I any case, the value of the security should not be less than 200% of the loan amount.",
    repayment:"7 to 9 years In specific cases, depending on the sttus of the Estate & rejuvenation period required, it may be extended upto 20 years.",
    docs:"Copies of land records regarding land owned & to be purchased, certified by concerned revenue authoritiesNo dues certificate from PACS / Commodity Boards / Financial Institutions.Documents of title & other relevant documents related to landed property as well as lands to be purchased.Copy of sale agreement, if entered into or offer letter by the vendorCrop history of the Estate to be purchased as well as existing EstatesValuation report of the Estate to be purchased from the Panel Valuer",
    link:"https://bankofmaharashtra.in/estate-purchase-loans",
    type:"Farm Management",
  },
  {
    id:19,
    name: "Financing Solar Energy Based Pumpset Loans",
    purpose: "Installation of Solar water Pumping System",
    elig:
    
      "Farmer should have adequate source of waterFor wells, it should have sufficient recouping capacity to irrigate the areaFarmer should have own economic land holding with minimum of 10 acres..",
    amount: "  75% of the cost of the equipment",
    margin: "Upto Rs. 1.60 lakh - Nil Above Rs.1.60 lakh - Margin shall be minimum of 25%. If subsidy is available, same can be considered as margin",
    rof:"Up to Rs.10.00 lakh     : 1 Year MCLR + BSS@0.50% + 2.00% Above Rs.10.00 lakh    : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"Upto Rs. 1.60 lakh - Hypothecation of Equipment Above Rs.1.60 lakh- Hypothecation of Equipment & Third Party Guarantee/ Mortgage of Land",
    repayment:"Minimum 5-7 years",
    docs:" Loan application ie Form No -138,  &  Enclosure – B2 All 7/12, 8 A, 6 D extracts, Boundaries of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgagedCopy of Quotations / Estimates 2.   Guarantee form F-138 All 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/solar-based-pumpset-loans",
    type:"Irrigation",
  },
  {
    id:20,
    name: "Financing Solar Water Heaters",
    purpose: "Purchase of brand new solar water heating system with necessary accessories for usage in Agro Processing units",
    elig:
    
      "Small & Marginal farmersShare Croppers / Tenant FarmersAgri-Entrepreneurs",
    amount: " 80-85% of the project cost including the cost of accessories",
    margin: "Upto Rs. 1.60 lakh - Nil Above Rs.1.60 lakh – 15 to 25 %",
    rof:"   Up to Rs.10.00 lakh     : 1 Year MCLR + BSS@0.50% + 2.00% Above Rs.10.00 lakh             : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"Upto Rs. 1.60 lakh - Hypothecation of Equipment & Accessories Above Rs.1.60 lakh –  Hypothecation of Equipment & Accessories & Third Party Guaranty/ Mortgage of land",
    repayment:"Minimum 3-5 years",
    docs:"Applicant: - Loan applicationAll 7/12, 8 A, 6 D extracts, Boundaries of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgagedCopy of Quotations / Estimates Guarantor (for loans above Rs.1.60 lakh): -Guarantor formAll 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/solar-water-heaters",
    type:"Farm Management",
  },
  {
    id:21,
    name: "Financing Solar Home Lighting Scheme",
    purpose: "Purchase of brand new solar lighting system with necessary accessories for usage in Agro Processing units",
    elig:
    
      "Small & Marginal farmersShare Croppers / Tenant FarmersAgri-Entrepreneurs",
    amount: "80-85% of the project cost including the cost of accessories",
    margin: "Upto Rs. 1.60 lakh - Nil Above Rs.1.60 lakh – 15-20% of the cost of equipment including cost of accessories",
    rof:"Up to Rs.10.00 lakh     : 1 Year MCLR + BSS@0.50% + 2.00% Above Rs.10.00 lakh    : 1 Year MCLR +BSS@0.50%+ 3.00%",
    security:"Upto Rs. 1.60 lakh - Hypothecation of Equipment & Accessories Above Rs.1.60 lakh –  Hypothecation of Equipment & Accessories & Third Party     Guaranty/ Mortgage of land",
    repayment:"   Minimum 3-5 years",
    docs:" Applicant: - Loan applicationAll 7/12, 8 A, 6 D extracts, Boundaries of the applicantNo dues certificates of the applicant from surrounding financial institutions including PACSLegal search from advocate on Bank’s panel for loans above Rs.1.60 lakh where land is to be mortgagedCopy of Quotations / EstimatesGuarantor for loans above Rs.1.60 lakh : -Guarantor formAll 7/12, 8 A & PACS dues certificate of the guarantors",
    link:"https://bankofmaharashtra.in/solar-home-lighting-scheme",
    type:"Farm Management",
  },
  {
    id:22,
    name: "Maha Krishi Samrudhi Yojana (MKSY)",
    purpose: "Financing new project/expansion of existing unit i.e. acquisition/construction of Land and Building and Plant and machinery based on the project cost including takeover of existing unit.To finance the borrower units with cluster approach on PAN India basis",
    elig:
    
      "Individual, Proprietorship, Partnership Concern, FPCs, Private Limited Companies, Public Limited Companies and Limited Liability Partnership concern.All Advances to new/existing (including take over from other Banks/FIs) food and Agro-processing units under “Agriculture”",
    margin: " Term Loan: – Minimum 10 to 25% (case to case basis)Working Capital: -Stocks & Book Debt – Minimum 25%.  ",
    ROI:"As per Risk Based Pricing Minimum - RLLR + 0.10 % P.A. Maximum -RLLR + 1.05 % P.A.",
    repayment:"Term Loan: Maximum period upto 10 Years (Including Moratorium Period).Working Capital: Repayable on demand",
    docs:"NIL Processing Feefor borrowers / units with CIBIL MSME rank CMR-1 to CMR- 250% Concession in applicable Processing Fee for borrowers / units with CMR 3 and CMR-425 % Concession in applicable Processing Fee for borrowers / units with CMR 5 and CMR-6 and Unrated",
    link:"https://bankofmaharashtra.in/maha-krishi-samrudhi-yojana",
    type:"General Working Capital",
  },
  {
    id:23,
    name: "Maha Agri-machinery Rental Scheme (MARS)",
    purpose: "Credit facilities may be considered for activities providing custom services to farmers like For financing ‘Custom Hiring Centers’ for purchase of tractor, power tiller, bulldozer, trailer and accessories, combine harvester, grain threshers, sprayers, dusters, ploughs, drills and such other farm implements and equipment’s needed for agricultural activity used for hiring on custom basis. Purchase of Aerial spraying machineries / Implements. Purchase of drilling rig for boring wells / drilling of tube wellsPurchase of  equipment for construction of wells and /or execution of lift irrigation scheme for water supply service Purchase of truck and trailer units to be hired to farmers for transporting farm produce from farms to processing factories or market yards.Purchase of Excavator for earth works acquiring tankers engaged in transportation of milk Acquiring specialized trucks for transportation of poultry birds Purchase of bullock cart",
    elig:
    "Individual, Proprietorship, Partnership Concern, FPO/FPCs, Private Limited Companies, Public Limited Companies and Limited Liability Partnership concern, Self Help Groups, Joint Liability Groups, Co-operative Society of farmers and Rural Entrepreneur (Rural youth and farmer as an entrepreneur)",
    amount: "Minimum: No Minimum Limit  Maximum: Rs. 5.00 Cr per Borrower",
    margin: "Loan up to Rs.1.60 Lakh : No margin Loan above Rs.1.60 Lakh : 15 %",
    rof:"Risk Based Pricing Minimum -RLLR + 0.10% P.A. Maximum - RLLR + 1.15% P.A.",
    security:"Loan up to Rs.1.60 Lakh : Hypothecation of assets created out of bank finance Loan above Rs.1.60 Lak:Primary Security –Hypothecation of assets created out of bank finance Collateral Security  Mortgage of immovable property (Compliant under SARFAESI Act) in the name of borrower/s, proprietors, partners, directors or close relatives such as spouse, parents (father & mother), brother, sister, son, daughter and daughter-in-law may be accepted as security. The owner of the property invariably be taken as guarantor to the credit facilities.Noting of Bank’s hypothecation charge in the RC book, Two blank TTO forms signed by the borrower/s.",
    repayment:"Maximum 7 years (Including Maximum Moratorium Period up to 6 months) on monthly/quarterly/ half-yearly annual instalments based on income generation and also depending upon the purpose of investment, economic life of assets and cash flow of activity.",
    docs:"Loan application i.e. Form No.138 & Enlosure B2 All 7/12, 8A, 6D extract, Chatu Sima of the land of applicant/s. In case co-applicant is salaried/ businessmen the latest salary slip/ ITR/Form 16/Balance Sheet & P/L/Statement. No dues certificates of the applicant/s from surrounding financial institutions including PACS. Legal Search & Valuation report for loans above Rs.1.60 Lakh where land is mortgaged Price Quotation of Vehicle/ Machineries from Authorized dealers. Guarantee Form F-138 All 7/12, 8A & PACS due certificate In case guarantor is salaried/ businessmen, the latest salary slip/ ITR/Form 16/Balance Sheet & P/L/Statement.",
    link:"https://bankofmaharashtra.in/mars",
    type:"Vehicles& Machinery",
  },
  

];


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/loans", (req, res) => {
  console.log(loans);
  res.json(loantypes);
});




app.get("/loans/:type", (req, res) => {
  const type = req.params.type;
  const filteredActivities = loans.filter((loan) => loan.type === type);
  res.json(filteredActivities);
});

app.get("/allloans",(req,res)=>{
    res.json(loans);
});


app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });
  