
export const setBuyerToken = ()=>{
    let localdata = [
        { GUID: "{B01B4650-BD6B-4CF4-A552-BA9691B91A9F}",
          Name:"Marina_Portal",
          authentication:"Y6K4awmPFEbbpw2KRwvXnOcsapecPYJN-qcbxyTT2Pz57Hgot6YbL9SK3bW-2v17piUq4_N0beqBMklbc0QMgDFIiXl1vtyKwadzeTqIwRIy4__aMRHgp5N8aJPXi36LGFddxSkKIBEojlmA-C_ZtkAMqb7V6vkY59Y-IO7back3j9oVB1_F_cZf8EF502pDoBrpEXR"
        },
        { GUID:"{C1ED4FFD-C125-49DE-BC66-C81CFECE5DCD}",
          Name:"NIC_Portal",
          // authentication:""
          authentication:"S7aa2yRSg-pyMBbCv3GT4ROkSIVAkgzLkF8tXFERWCV1IlRXuFQ2u9C_qrSQeio-9DrCl3exYWrgPMKmuqjpxteuALNyUI_bwOmuT3i2TC5t3si-eFFzjKV1wso7z-lM-tVCdvY9eBwq4cOjNKZ__ExzQC024o_cGcTA1hADOlsNTFvqnsRUtMiqs-0g4R7HdYnpJmH9GaZd2bRxkXml9HLgSpwNdbhVy2CaOrlsOITL917tcqTjE95vV_THbKQnVS3nEWL7di3ThmQuHPafPTm-4Fz-QichK_F9lb1tHo1ZO5O13FTl_yARMpEVpPu_NwvVdCV7mob79JC91iDaIQ"
        }
      
    ]
    localStorage.setItem("nic-vaults",JSON.stringify(localdata))
}


