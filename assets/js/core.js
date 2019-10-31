/**
 *
 */
let hexToRgba = function(hex, opacity) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let rgb = result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;

  return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
};

/**
 *
 */
$(document).ready(function() {
  /** Constant div card */
  const DIV_CARD = 'div.card';

  /** Initialize tooltips */
  $('[data-toggle="tooltip"]').tooltip();

  /** Initialize popovers */
  $('[data-toggle="popover"]').popover({
    html: true
  });

  /** Function for remove card */
  $('[data-toggle="card-remove"]').on('click', function(e) {
    let $card = $(this).closest(DIV_CARD);

    $card.remove();

    e.preventDefault();
    return false;
  });

  /** Function for collapse card */
  $('[data-toggle="card-collapse"]').on('click', function(e) {
    let $card = $(this).closest(DIV_CARD);

    $card.toggleClass('card-collapsed');

    e.preventDefault();
    return false;
  });

  /** Function for fullscreen card */
  $('[data-toggle="card-fullscreen"]').on('click', function(e) {
    let $card = $(this).closest(DIV_CARD);

    $card.toggleClass('card-fullscreen').removeClass('card-collapsed');

    e.preventDefault();
    return false;
  });

  /**  
  if ($('[data-sparkline]').length) {
    let generateSparkline = function($elem, data, params) {
      $elem.sparkline(data, {
        type: $elem.attr('data-sparkline-type'),
        height: '100%',
        barColor: params.color,
        lineColor: params.color,
        fillColor: 'transparent',
        spotColor: params.color,
        spotRadius: 0,
        lineWidth: 2,
        highlightColor: hexToRgba(params.color, .6),
        highlightLineColor: '#666',
        defaultPixelsPerValue: 5
      });
    };

    require(['sparkline'], function() {
      $('[data-sparkline]').each(function() {
        let $chart = $(this);

        generateSparkline($chart, JSON.parse($chart.attr('data-sparkline')), {
          color: $chart.attr('data-sparkline-color')
        });
      });
    });
  }

  /**  
  if ($('.chart-circle').length) {
    require(['circle-progress'], function() {
      $('.chart-circle').each(function() {
        let $this = $(this);

        $this.circleProgress({
          fill: {
            color: tabler.colors[$this.attr('data-color')] || tabler.colors.blue
          },
          size: $this.height(),
          startAngle: -Math.PI / 4 * 2,
          emptyFill: '#F4F4F4',
          lineCap: 'round'
        });
      });
    });
  }*/

  /** Function for enabling stateBenefit */
  $('[data-toggle="state-benefit"]').on('click', function(e) {
    let $formGroup = $(this).closest('.form-group'),
      $input = $formGroup.find('[name*="amount"]');
    if($input.is(':disabled')){
      $input.val('8767.20');
      $input.prop('disabled',false);
    } else {
      $input.val('');
      $input.prop('disabled',true);
    }
  });

  /** Function for enabling spouse */
  $('[data-toggle="spouse"]').on('change', function(e) {
    let $dobGroup = $(this).closest('.form-group'),
      $genderGroup = $dobGroup.next(),
      $stateGroup = $genderGroup.next();
    if($(this).prop('checked')){
      $dobGroup.find('select').prop('disabled',false)
      $genderGroup.find('input').prop('disabled',false)
      $genderGroup.find('.disabled').removeClass('disabled');
      $stateGroup.find('[type="checkbox"]').prop('disabled',false);
    } else {
      $dobGroup.find('select').val('').prop('disabled',true);
      $genderGroup.find('input').prop('disabled',true);
      $genderGroup.find('.selectgroup').addClass('disabled');
      $stateGroup.find('[type="number"]').val('').prop('disabled',true);
      $stateGroup.find('[type="checkbox"]').prop('checked',false).prop('disabled',true);
    }
  });

  /** Function for add asset */
  let numAssetTabs = $('#assetTabTemplate').siblings('.tab-pane').length;
  $('[data-toggle="asset-add"]').on('click', function(e) {
    let $tabsArea = $(this).parent().next().find('.tabs-content').first(),
      tabTemplateHtml = $('#assetTabTemplate').html(),
      newTabHtml = tabTemplateHtml.replace(/##NUM##/g,numAssetTabs).replace(/##NUM\+1##/g,numAssetTabs+1),
      $newTab = $(newTabHtml);

    $tabsArea.append($newTab);
    $tabsArea.children('.tab-pane.active').removeClass('active');
    $newTab.addClass('active');

    let $tabBtnsArea = $(this).next(),
      tabBtnTemplateHtml = $('#assetTabBtnTemplate').html(),
      newTabBtnHtml = tabBtnTemplateHtml.replace(/##NUM##/g,numAssetTabs).replace(/##NUM\+1##/g,numAssetTabs+1),
      $newTabBtn = $(newTabBtnHtml);
    $tabBtnsArea.append($newTabBtn);
    $tabBtnsArea.find('.list-group-item.active').removeClass('active');
    $newTabBtn.find('.list-group-item').addClass('active');

    numAssetTabs=numAssetTabs+1;

    e.preventDefault();
    return false;
  });

  /** Function for remove asset */
  $('body').on('click', '[data-toggle="asset-remove"]', function(e) {
    let tabId = $(this).data('toggle-target');
    if(tabId){
      let $tab = $('#'+tabId);
      if($tab.hasClass('active')){
        $tab.removeClass('active').prev().addClass('active')
      }
      $tab.remove();
    }

    let $tabBtn = $(this).parent();
    if($tabBtn.find('.list-group-item').hasClass('active')){
      $tabBtn.find('.list-group-item').removeClass('active');
      $tabBtn.prev().find('.list-group-item').addClass('active');
    }
    $tabBtn.remove();

    //numTabs=numTabs-1;

    e.preventDefault();
    return false;
  });

  /** Initialize tabs */
  $('body').on('click', '[data-toggle="tab"]', function(e) {
    let tabId = $(this).data('toggle-target');
    if(tabId){
      let $tab = $('#'+tabId);
      if($tab.length){
        $tabsArea = $tab.closest('.tabs-content');
        if($tabsArea.length){
          $tabsArea.find('> .tab-pane').removeClass('active');
        }
        $tab.addClass('active');
      }
    }

    let $tabBtn = $(this),
      tabBtnAreaId = $tabBtn.data('tab-buttons');
    if(tabBtnAreaId){
      let $tabBtnArea = $('#'+tabBtnAreaId),
        $tabBtns = $tabBtnArea.find('[data-toggle="tab"]');
      $tabBtns.removeClass('active');
    }
    $tabBtn.addClass('active');

    e.preventDefault();
    return false;
  });

  /** Function for cont fixed/pc change */
  $('body').on('change', '[data-toggle="cont-fixed-pc"]', function(e) {
    let $inputGroup = $(this).closest('.form-group').next().find('.input-group');
    if($inputGroup.length){
      let $fixed = $inputGroup.find('.input-group-prepend'), $pc = $inputGroup.find('.input-group-append');
      if($fixed.is(':visible')){
        $fixed.hide();
        $pc.show();
      } else {
        $fixed.show();
        $pc.hide();
      }
    }

    e.preventDefault();
    return false;
  });

  /** Function for adding charge tier */
  $('body').on('click', '[data-toggle="tier-add"]', function(e) {
    let $tiersArea = $(this).closest('.row').next(),
      numTiers = $tiersArea.children('.row').length,
      thisAssetNum = parseInt($(this).closest('.tab-pane').attr('id').split(/asset|Charge/g)[1])-1,
      tierTemplateHtml = $('#chargeTierTemplate').html(),
      newTierHtml = tierTemplateHtml.replace(/##NUMTIER##/g,0).replace(/##NUMTIER\+1##/g,1).replace(/##NUMASSET##/g,thisAssetNum).replace(/##NUMASSET\+1##/g,thisAssetNum+1),
      $newTier = $(newTierHtml),
      $lastTier = $tiersArea.find('.row').last();
    
    if($tiersArea.length){
      $tiersArea.find('input').each((i,e)=>{
        let $e = $(e),
          newName = $e.attr('name').replace(/\[tieredCharges\]\[(\d+)\]/,function(fullMatch,group){
            return '[tieredCharges]['+(parseInt(group)+1)+']'
          });
        $e.attr('name',newName);
      })
      $tiersArea.prepend($newTier);
    }

    e.preventDefault();
    return false;
  });

  /** Function for remove charge tier */
  $('body').on('click', '[data-toggle="tier-remove"]', function(e) {
    let $tier = $(this).closest('.row'),
      $tiersArea = $tier.parent(),
      numTiers = $tiersArea.children('.row').length,
      thisAssetNum = parseInt($(this).closest('.tab-pane').attr('id').split(/asset|Charge/g)[1]),
      $lastTier = $tiersArea.find('.row').last();
    
    if($tiersArea.length && numTiers > 1){
      $tier.remove();
      $tiersArea.find('input').each((i,e)=>{
        let $e = $(e),
          ind = $e.closest('.row').index(),
          newName = $e.attr('name').replace(/\[tieredCharges\]\[(\d+)\]/,function(fullMatch,group){
            return '[tieredCharges]['+ind+']'
          });
        $e.attr('name',newName);
      })
    }

    e.preventDefault();
    return false;
  });

  /** Function for adding fund to asset */
  $('body').on('click', '[data-toggle="fund-add"]', function(e) {
    let $fundsArea = $(this).closest('.row').next(),
      numFunds = parseInt($fundsArea.children('.fund').last().data('ref'))+1,
      thisAssetNum = parseInt($(this).closest('.tab-pane').attr('id').split(/asset|Fund/g)[1])-1,
      fundTemplateHtml = $('#fundTemplate').html(),
      newFundHtml = fundTemplateHtml.replace(/##NUMFUND##/g,numFunds).replace(/##NUMFUND\+1##/g,numFunds+1).replace(/##NUMASSET##/g,thisAssetNum).replace(/##NUMASSET\+1##/g,thisAssetNum+1),
      $newFund = $(newFundHtml),
      $firstFund = $fundsArea.find('.fund').first();
    
    if($fundsArea.length){
      $fundsArea.append($newFund);
    }

    e.preventDefault();
    return false;
  });

  /** Function for removing fund from an asset */
  $('body').on('click', '[data-toggle="fund-remove"]', function(e) {
    let $fund = $(this).closest('.fund');
    if($fund.length){
      $fund.find('[name*="contributionPercentage"]').val(0).trigger('change');
      $fund.remove();
    }

    e.preventDefault();
    return false;
  });

  /** Function for enabling fund risk group */
  $('body').on('change', '[data-toggle="fund-risk"]', function(e) {
    let $formGroup = $(this).closest('.form-group'),
      $select = $formGroup.find('.selectgroup'),
      disabled = $select.hasClass('disabled');
    if(disabled){
      $formGroup.find('[name*="riskGroup"]').prop('checked',false);
      $formGroup.find('[name*="riskGroup"][value="3"]').prop('checked',true);
      $select.removeClass('disabled');
      $formGroup.next().find('input').prop('disabled',false)
    } else {
      $select.addClass('disabled');
      $formGroup.find('[name*="riskGroup"]').prop('checked',false);
      $formGroup.find('[name*="riskGroup"][value="3"]').prop('checked',true);
      $formGroup.next().find('input').val('').prop('disabled',true)
    }

    //e.preventDefault();
    //return false;
  });

  /** Function to keep contributionPercentage=100 */
  $('body').on('change', '[name*="contributionPercentage"]', function(e) {
    let $input = $(this),
      $fundsArea = $input.closest('.funds');
    $input.val(numberVal($input.val(),0,100))
    if($fundsArea.length){
      let $inputs = $fundsArea.find('[name*="contributionPercentage"]'),
        sum = 0;
      $inputs.each((i,e)=>{
        if(i>0) sum += numberVal($(e).val(),0,100)
      })
      $inputs.first().val(numberVal(100-sum,0,100))
    }
  });

  /** Function for adding property */
  $('body').on('click', '[data-toggle="property-add"]', function(e) {
    let $propertiesArea = $(this).closest('.row').next(),
      numProperties = $propertiesArea.children('.property').length ? parseInt($propertiesArea.children('.property').last().data('ref'))+1 : 0,
      propertyTemplateHtml = $('#propertyTemplate').html(),
      newPropertyHtml = propertyTemplateHtml.replace(/##NUM##/g,numProperties).replace(/##NUM\+1##/g,numProperties+1),
      $newProperty = $(newPropertyHtml);
    
    if($propertiesArea.length){
      $propertiesArea.append($newProperty);
    }

    e.preventDefault();
    return false;
  });

  /** Function for removing property */
  $('body').on('click', '[data-toggle="property-remove"]', function(e) {
    let $property = $(this).closest('.property');
    if($property.length){
      $property.remove();
    }

    e.preventDefault();
    return false;
  });

  /** Rental income frequency dropdown */
  $('body').on('click', '.property .dropdown-item', function(e) {
    let $span = $(this).parent().prev(),
      $select = $span.parent().next();
    if($span.length){
      $span.html($(this).html());
      $select.val($span.html().toUpperCase())
    }
    // e.preventDefault();
    // return false;
  });

  /** Submit click */
  $('#pfpBtn,#pcBtn').on('click', function(e) {
    if(!$('#chartCard').find('.dimmer').hasClass('active')){
      $('#chartCard').find('.dimmer').addClass('active');
      let formObj = $('#form').serializeControls(),
        requestObj = toRequestObj(formObj),
        accessToken = $('#accessToken').val(),
        pfp = $(this).attr('id') === 'pfpBtn' ? true : false;
      console.log(requestObj);
      if(accessToken && !requestObj.err){
        fetch("https://api.evalueproduction.com/retirementAdvanced/1.0.1/retirementAdvanced/forecast", {
          //"credentials":"include",
          "headers":{
            "accept":"application/json",
            "accept-language":"en-US,en;q=0.9",
            "authorization":"Bearer "+accessToken,
            //"cache-control":"no-cache",
            "content-type":"application/json",
            //"pragma":"no-cache",
            "sec-fetch-mode":"cors",
            //"sec-fetch-site":"same-site"
          },
          "referrer":"", // no referer header
          "referrerPolicy":"no-referrer",
          "body":JSON.stringify(requestObj),
          "method":"POST",
          //"mode":"cors"
        }).then(resp => resp.json()).then(result => {
          if(result){
            if(result.fault){
              /*fetch("https://api-store.evalueproduction.com/store/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
                //"credentials":"include",
                "headers":{
                  "accept":"application/json, text/javascript; q=0.01",
                  "accept-language":"en-US,en;q=0.9",
                  //"cache-control":"no-cache",
                  "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
                  //"pragma":"no-cache",
                  //"sec-fetch-mode":"cors",
                  //"sec-fetch-site":"same-origin",
                  //"x-csrftoken":"null",
                  //"x-requested-with":"XMLHttpRequest"
                },
                "referrer":"https://api-store.evalueproduction.com/store/site/pages/application.jag?name=LifeSight%20Test",
                "referrerPolicy":"no-referrer-when-downgrade",
                "body":"action=refreshToken&application=LifeSight+Test&keytype=SANDBOX&oldAccessToken="+accessToken+"&clientId=G1rx9QpL46gcyeMpvggU8mgJ1Swa&clientSecret=IGBsnnTv1I80tvZfDynrKD7CHnMa&validityTime=360000&tokenScope=",
                "method":"POST",
                //"mode":"cors"
              });*/
              $('#chartCard').find('.dimmer').removeClass('active');
              console.log(result);
              alert(result.fault.message);
            } else if(result.errors){
              $('#chartCard').find('.dimmer').removeClass('active');
              console.log(result);
              alert(result.errors[0].message);
            } else {
              console.log(result);
              if(pfp) createPFP(requestObj,result);
              else createLine(requestObj,result);
            }
          } else {
            $('#chartCard').find('.dimmer').removeClass('active');
            alert('Error');
          }
        }).catch((err)=>{
          $('#chartCard').find('.dimmer').removeClass('active');
          console.log(err);
          alert(err.message);
        });
      } else if(accessToken) {
        $('#chartCard').find('.dimmer').removeClass('active');
        alert(requestObj.err);
      } else {
        $('#chartCard').find('.dimmer').removeClass('active');
        alert("Must pass access token");
      }
    }

    e.preventDefault();
    return false;
  });
  
  function truthyVal(val){
    return val === true || (
      typeof val === 'string' && (
        val.toLowerCase() === "true" || val.toLowerCase() === "on" || val.toLowerCase() === "yes" || val.toLowerCase() === "checked" || val.toLowerCase() === "selected"
      )
    ) || (!isNaN(val) && parseFloat(val) > 0)
  }
  function numberVal(val,min,max,def){
    if(isNaN(min)) min = -1*Infinity; else min = parseFloat(min);
    if(isNaN(max)) max = Infinity; else max = parseFloat(max);
    if(def === undefined) def = 0;
    return val==="" || isNaN(val) ? def : Math.max(min,Math.min(Math.round(100*parseFloat(val))/100, max));
  }
  function objToArray(obj){
    let keys = Object.keys(obj), arr = [];
    keys = keys.sort();
    keys.forEach((key,i)=>{
      arr[i] = obj[key];
    })
    return arr;
  }
  function dateDiff(d1,d2) {
    const mod = (x, n) => (x % n + n) % n,
      dim = d => d.getFullYear ? new Date(d.getFullYear(), d.getMonth()+1, 0).getDate() : new Date(2001, d+1, 0).getDate();
    if(d2 === undefined) d2 = new Date();
    if(d2.getFullYear){
      if(d2<d1){
        let t = d1; d1=d2; d2=t;
      }
      let y = d2.getFullYear() - d1.getFullYear(),
        m = d2.getMonth() - d1.getMonth(),
        d = d2.getDate() - d1.getDate();
      if (m < 0 || (m === 0 && d < 0)) y-=1;
      return [y,mod(m, 12),mod(d,dim(d2))];
    } else if(Array.isArray(d2)){
      return new Date(d1.getFullYear()+(d2.length?d2[0]:d2),d1.getMonth()+(d2[1]?d2[1]:0),d1.getDate()+(d2[2]?d2[2]:0));
    } else {
      let y = d2 | 0,
        m = ((d2-y)*12) | 0,
        d = ((d2-y-m/12)*dim(dateDiff(d1,[y,m]))) | 0;
      return new Date(d1.getFullYear()+y,d1.getMonth()+m,d1.getDate()+d);
    }
  }

  function toRequestObj(formObj){
    let requestObj = {
      user:{stateBenefit:{}, spouse:{stateBenefit:{}}, salaryIncrease: {}},
      assets:[],
      definedBenefits: [],
      targetOptions: {},
      forecastOptions: {percentiles:[], terms:[]},
      properties: [],
      otherIncomes: [],
      targets: []
    }

    // User
    requestObj.user = $.extend({},formObj.user);
    if(!requestObj.user.dateOfBirth || !requestObj.user.dateOfBirth.year || !requestObj.user.dateOfBirth.month || !requestObj.user.dateOfBirth.day) return {err:"User DOB error"};
    requestObj.user.dateOfBirth = [requestObj.user.dateOfBirth.year,requestObj.user.dateOfBirth.month,requestObj.user.dateOfBirth.day].join('-');
    requestObj.user.salary = numberVal(requestObj.user.salary,0,999999999);
    requestObj.user.salaryIncrease.rate = numberVal(requestObj.user.salaryIncrease.rate, -100, 100);
    if(!requestObj.user.stateBenefit) delete requestObj.user.stateBenefit; //{include:false,amount:0}
    else {
      requestObj.user.stateBenefit.include = truthyVal(requestObj.user.stateBenefit.include);
      requestObj.user.stateBenefit.amount = numberVal(requestObj.user.stateBenefit.amount, 0, 999999999, requestObj.user.stateBenefit.include ? 8767.2 : 0);
    }
    if(requestObj.user.spouse && truthyVal(requestObj.user.spouse.include)) {
      delete requestObj.user.spouse.include;
      if(!requestObj.user.spouse.gender) return {err:"Spouse gender is required"};
      if(!requestObj.user.spouse.dateOfBirth || !requestObj.user.spouse.dateOfBirth.year || !requestObj.user.spouse.dateOfBirth.month || !requestObj.user.spouse.dateOfBirth.day) return {err:"Spouse DOB error"};
      requestObj.user.spouse.dateOfBirth = [requestObj.user.spouse.dateOfBirth.year,requestObj.user.spouse.dateOfBirth.month,requestObj.user.spouse.dateOfBirth.day].join('-');
      if(!requestObj.user.spouse.stateBenefit) delete requestObj.user.spouse.stateBenefit; //{include:false,amount:0}
      else {
        requestObj.user.spouse.stateBenefit.include = truthyVal(requestObj.user.spouse.stateBenefit.include);
        requestObj.user.spouse.stateBenefit.amount = numberVal(requestObj.user.spouse.stateBenefit.amount, 0, 999999999, requestObj.user.spouse.stateBenefit.include ? 8767.2 : 0);
      }
    } else {
      delete requestObj.user.spouse;
    }

    // Assets
    requestObj.assets = objToArray($.extend({},formObj.assets));
    for(let i = requestObj.assets.length-1;i>=0;i--){
      let asset = requestObj.assets[i];
      if(!asset.typeReference) return {err:'Must include asset type reference (asset '+(i+1)+')'}
      // Contributions
      asset.contributions.percentage = truthyVal(asset.contributions.percentage)
      asset.contributions.amount = numberVal(asset.contributions.amount, 0, asset.contributions.percentage ? 100 : 999999999)
      if(!asset.contributions.amount) delete asset.contributions;
      else asset.contributions.increase.rate = numberVal(asset.contributions.increase.rate, -100, 100)
      
      // Initial Charges
      asset.initialCharges.percentage = numberVal(asset.initialCharges.percentage, 0, 100)
      asset.initialCharges.amount = numberVal(asset.initialCharges.amount, 0, 99999)
      asset.initialCharges.contributionPercentage = numberVal(asset.initialCharges.contributionPercentage, 0, 100)
      let check = asset.initialCharges.percentage + asset.initialCharges.amount + asset.initialCharges.contributionPercentage;
      if(!check) delete asset.initialCharges;
      
      // Annual Charges
      asset.annualCharges.amount = numberVal(asset.annualCharges.amount, 0, 99999)
      asset.annualCharges.tieredCharges = objToArray(asset.annualCharges.tieredCharges);
      asset.annualCharges.tieredCharges.forEach((tier,i)=>{
        asset.annualCharges.tieredCharges[i].percentage = numberVal(tier.percentage,0,100)
        asset.annualCharges.tieredCharges[i].upperLimit = numberVal(tier.upperLimit,0,999999999,999999999)
      })
      let errorFlag = false;
      asset.annualCharges.tieredCharges.sort((a,b)=>{
        if(a.upperLimit == b.upperLimit){
          errorFlag = true;
          return 0;
        }
        else return a.upperLimit < b.upperLimit ? -1 : 1;
      })
      if(errorFlag) return {err:'Two charge tiers cannot have the same upper limit (asset '+(i+1)+')'}
      if(asset.annualCharges.tieredCharges[asset.annualCharges.tieredCharges.length-1].upperLimit == 999999999)
        delete asset.annualCharges.tieredCharges[asset.annualCharges.tieredCharges.length-1].upperLimit;
      check = asset.annualCharges.amount + asset.annualCharges.tieredCharges.reduce((s,tier)=>s+tier.percentage,0);
      if(!check) delete asset.annualCharges;

      //Funds
      asset.funds = objToArray(asset.funds);
      for(let j = asset.funds.length-1;j>=0;j--){
        let fund = asset.funds[j];
        if(!fund.code) return {err:'Must include fund code (asset '+(i+1)+')'}
        fund.balance = numberVal(fund.balance, 0, 999999999)
        fund.contributionPercentage = fund.contributionPercentage === undefined ? null : numberVal(fund.contributionPercentage, -99, 99)
        fund.adjustment = numberVal(fund.adjustment, 0, 100)
        fund.riskEnabled = truthyVal(fund.riskEnabled)
        if(!fund.riskEnabled){
          delete fund.riskGroup;
          delete fund.riskTerm;
        } else {
          fund.riskGroup = Math.floor(numberVal(fund.riskGroup,1,5,3));
          fund.riskTerm = Math.floor(numberVal(fund.riskTerm,0,75))
        }
        delete fund.riskEnabled;
      }
      check = asset.funds.reduce((s,fund)=>s+fund.contributionPercentage,0) //x+null = x, so ok
      if(check > 100) return {err:'Total contribution percentage across funds in asset '+(i+1)+' must equal 100%'}
      for(let j = 0; j<asset.funds.length; j++){
        if(asset.funds[j].contributionPercentage === null){
          asset.funds[j].contributionPercentage = 100-check;
          break;
        }
      }
      for(let j = asset.funds.length-1;j>=0;j--){
        check = asset.funds[j].balance+asset.funds[j].contributionPercentage
        if(!check) asset.funds.splice(j,1);
      }
      //if(!asset.funds.length) requestObj.assets.splice(i,1);

      // Annuity
      /*if(!asset.annuity.purchaseDate || !asset.annuity.purchaseDate.year || !asset.annuity.purchaseDate.month || !asset.annuity.purchaseDate.day){
        delete asset.annuity;
      else {
        asset.annuity.purchaseDate = [asset.annuity.purchaseDate.year,asset.annuity.purchaseDate.month,asset.annuity.purchaseDate.day].join('-');*/
      asset.annuity.age = numberVal(asset.annuity.age,55,99)
      if(!asset.annuity.age) delete asset.annuity;
      else {
        let dob = new Date(requestObj.user.dateOfBirth),
          annuityDate = dateDiff(dob,asset.annuity.age);
        asset.annuity.purchaseDate = annuityDate.toISOString().split('T')[0];
        delete asset.annuity.age;
        asset.annuity.pensionIncrease.rate = numberVal(asset.annuity.pensionIncrease.rate,-100,100)
        asset.annuity.spousePercentage = Math.floor(numberVal(asset.annuity.spousePercentage,0,100))
        asset.annuity.guaranteePeriod = Math.floor(numberVal(asset.annuity.guaranteePeriod,0,10,5))
        asset.annuity.ownRate = numberVal(asset.annuity.ownRate,1,100)
        if(asset.annuity.ownRate<1) delete asset.annuity.ownRate;
        asset.annuity.proportion = numberVal(asset.annuity.proportion,0,100)
        if(asset.annuity.proportion<0.01 || asset.annuity.proportion>99.99) delete asset.annuity.proportion;
        else {
          asset.partialAnnuity = asset.annuity;
          delete asset.annuity;
        }
      }

      // Lump sum
      /*if(!asset.lumpSum.date || !asset.lumpSum.date.year || !asset.lumpSum.date.month || !asset.lumpSum.date.day){
        delete asset.lumpSum;
      } else {
        asset.lumpSum.date = [asset.lumpSum.date.year,asset.lumpSum.date.month,asset.lumpSum.date.day].join('-');*/
      asset.lumpSum.age = numberVal(asset.lumpSum.age,55,99)
      if(!asset.lumpSum.age) delete asset.lumpSum;
      else {
        let dob = new Date(requestObj.user.dateOfBirth),
          lumpSumDate = dateDiff(dob,asset.lumpSum.age);
        asset.lumpSum.date = lumpSumDate.toISOString().split('T')[0];
        delete asset.lumpSum.age;
        asset.lumpSum.percentage = numberVal(asset.lumpSum.percentage,0,100,25)
        if(asset.lumpSum.percentage<0.01) delete asset.lumpSum;
      }


    }
    if(!requestObj.assets.length) return {err:"Must include at least 1 asset"}

    // Defined benefits
    requestObj.definedBenefits = objToArray($.extend({},formObj.definedBenefits));
    for(let i = requestObj.definedBenefits.length-1;i>=0;i--){
      let db = requestObj.definedBenefits[i];
      db.income = numberVal(db.income,0,999999999);
      /*if(!db.startDate || !db.startDate.year || !db.startDate.month || !db.startDate.day || !db.income){
        requestObj.definedBenefits.splice(i,1);
      } else {
        db.startDate = [db.startDate.year,db.startDate.month,db.startDate.day].join('-');*/
      db.startAge = numberVal(db.startAge,55,99)
      if(db.startAge && db.income) {
        let dob = new Date(requestObj.user.dateOfBirth),
          dbDate = dateDiff(dob,db.startAge);
        db.startDate = dbDate.toISOString().split('T')[0];
        delete db.startAge;
        db.incomeIncrease.rate = numberVal(db.incomeIncrease.rate, -100, 100);
      } else requestObj.definedBenefits.splice(i,1);
    }
    if(!requestObj.definedBenefits.length) delete requestObj.definedBenefits;

    // Target options
    requestObj.targetOptions = $.extend({},formObj.targetOptions);
    requestObj.targetOptions.target = numberVal(requestObj.targetOptions.target,0,999999999);
    requestObj.targetOptions.increase.rate = numberVal(requestObj.targetOptions.increase.rate, -100, 100);
    if(!requestObj.targetOptions.target) return {err:"Must set target income > 0"}

    // Forecast options
    requestObj.forecastOptions = $.extend({},formObj.forecastOptions);
    /*if(!requestObj.forecastOptions.retirementDate || !requestObj.forecastOptions.retirementDate.year || !requestObj.forecastOptions.retirementDate.month || !requestObj.forecastOptions.retirementDate.day)
      return {err:"Must specify retirement date"}
    requestObj.forecastOptions.retirementDate = [requestObj.forecastOptions.retirementDate.year,requestObj.forecastOptions.retirementDate.month,requestObj.forecastOptions.retirementDate.day].join('-');*/
    requestObj.forecastOptions.retirementAge = numberVal(requestObj.forecastOptions.retirementAge,55,99)
    if(!requestObj.forecastOptions.retirementAge) return {err:"Must provide retirement age (>= 55)"}
    let dob = new Date(requestObj.user.dateOfBirth),
      retDate = dateDiff(dob,requestObj.forecastOptions.retirementAge);
    requestObj.forecastOptions.retirementDate = retDate.toISOString().split('T')[0];
    delete requestObj.forecastOptions.retirementAge;
    requestObj.forecastOptions.terms.from = Math.floor(numberVal(requestObj.forecastOptions.terms.from,0,75))
    requestObj.forecastOptions.terms.to = Math.floor(numberVal(requestObj.forecastOptions.terms.to,0,75))
    if(requestObj.forecastOptions.terms.from > requestObj.forecastOptions.terms.to){
      requestObj.forecastOptions.terms.from = Math.floor(numberVal(formObj.forecastOptions.terms.to,0,75))
      requestObj.forecastOptions.terms.to = Math.floor(numberVal(formObj.forecastOptions.terms.from,0,75))
    }
    requestObj.forecastOptions.terms = new Array(requestObj.forecastOptions.terms.to-requestObj.forecastOptions.terms.from+1).fill().map((e, i) => requestObj.forecastOptions.terms.from + i);
    requestObj.forecastOptions.percentiles = requestObj.forecastOptions.percentiles.replace('%','').split(',').map(v=>numberVal(v,0,100,50)).filter((p,i,arr) => arr.indexOf(p) == i).sort((a,b)=>a>b?1:-1);

    // Properties
    requestObj.properties = objToArray($.extend({},formObj.properties));
    for(let i = requestObj.properties.length-1;i>=0;i--){
      let prop = requestObj.properties[i];
      prop.purchasePrice = numberVal(prop.purchasePrice,0,10000000);
      prop.currentValue = numberVal(prop.currentValue,0,10000000);
      prop.valueIncrease.rate = numberVal(prop.valueIncrease.rate,-100,100);
      /*if(prop.currentValue){
        if(prop.futureSaleDate && prop.futureSaleDate.year && prop.futureSaleDate.month && prop.futureSaleDate.day){
          prop.futureSaleDate = [prop.futureSaleDate.year,prop.futureSaleDate.month,prop.futureSaleDate.day].join('-')
        } else delete prop.futureSaleDate;*/
      prop.futureSaleAge = numberVal(prop.futureSaleAge,55,99)
      if(prop.futureSaleAge && prop.currentValue) {
        let dob = new Date(requestObj.user.dateOfBirth),
          propDate = dateDiff(dob,prop.futureSaleAge);
        prop.futureSaleDate = propDate.toISOString().split('T')[0];
        delete prop.futureSaleAge;
        prop.rental.income = numberVal(prop.rental.income,0,10000000);
        switch(prop.rental.frequency){
          case "WEEKLY":
              prop.rental.income *= 365/12/7;
              break;
          case "QUARTERLY":
              prop.rental.income *= 1/3;
              break;
          case "ANNUALLY":
              prop.rental.income *= 1/12;
              break;
          default:
              break;
        }
        delete prop.rental.frequency;
        prop.rental.increase.rate = numberVal(prop.rental.increase.rate,-100,100);
      } else requestObj.properties.splice(i,1);
    }
    if(!requestObj.properties.length) delete requestObj.properties;

    // Other incomes
    requestObj.otherIncomes = objToArray($.extend({},formObj.otherIncomes));
    if(!requestObj.otherIncomes.length) delete requestObj.otherIncomes;

    // Targets
    requestObj.targets = objToArray($.extend({},formObj.targets));
    if(!requestObj.targets.length) delete requestObj.targets;

    return requestObj;
  }

  function createPFP(request, result, callback){
    require(['jquery', 'jquery-fusioncharts', 'fusioncharts', 'fusioncharts-theme', 'fusioncharts-timeseries'], function ($, jqfc, FusionCharts, FusionChartsTheme, TimeSeries) {
      let dob = new Date(request.user.dateOfBirth),
        age = dateDiff(dob)[0],
        retAge = dateDiff(dob,new Date(request.forecastOptions.retirementDate))[0];

      let centralResult = -1, record = Infinity;
      for(let i=0;i<result.results.length;i++){
        if(Math.abs(result.results[i].percentile-50)<record){
          centralResult=i;
          record=Math.abs(result.results[i].percentile-50);
        }
      }

      let chartObj = {
        type: 'stackedcolumn2dline', //stackedcolumn2dlinedy
        renderAt: 'container',
        width: '100%',
        height: '500',
        dataFormat: 'json',
        dataSource: {
          chart: {
            caption: "Spending Planer - PFP",
            subcaption: "",
            yaxisname: "Amount (in GBP)",
            xaxisname: "Age (in years)",
            //syaxisname: "",
            formatnumberscale: "0",
            numberprefix: "£",
            numbersuffix: "",
            //snumbersuffix: "%",
            showvalues: "0",
            showanchors: "0",
            //showToolTip: "0",
            drawcrossline: "0",
            showhovereffect: "0",
            plotcolorintooltip: "0",
            plottooltext: "$seriesName at age $label is <b>$dataValue</b>",
            decimals: "0",
            //showToolTip: "0",
            theme: "fusion"
          },
          categories: [{
            category: new Array(result.results[centralResult].terms.length).fill().map((zero, i) => {
              return {
                label: (age+result.results[centralResult].terms[i].term).toString()
              }
            }).filter((cat,i)=>parseInt(cat.label)<100)
          }],
          dataset: [{
            seriesname: "Savings",
            plottooltext: "$seriesName at age $label are <b>$dataValue</b>",
            data: result.results[centralResult].terms.map((proj,i)=>{
              return {value: proj.value && age+proj.term<retAge ? proj.value : null};
            })
          }, {
            seriesname: "Income",
            data: result.results[centralResult].terms.map((proj,i)=>{
              return {value: proj.income ? proj.income : null}
            })
          }, {
            seriesname: "Lump Sum",
            data: result.results[centralResult].terms.map((proj,i)=>{
              return {value: proj.lumpSum ? proj.lumpSum : null}
            })
          }, {
            seriesname: "Tax",
            data: result.results[centralResult].terms.map((proj,i)=>{
              return {value: proj.tax ? proj.tax : null}
            })
          }, {
            seriesname: "Target",
            renderAs: "line",
            data: result.results[centralResult].terms.map((proj,i)=>{
              return {value: proj.target ? proj.target : null}
            })
          }/*, {
            seriesname: "YoY Growth",
            parentyaxis: "S",
            plottooltext: "$dataValue growth expected in $label",
            renderas: "line",
            data: [{
              value: "73"
            }, {
              value: "63"
            }, {
              value: "42"
            }, {
              value: "31"
            }, {
              value: "24"
            }, {
              value: "20"
            }]
          }*/]
        }
      }
      // lumpSum fix
      //chartObj.dataSource.dataset[2].data.pop();
      //chartObj.dataSource.dataset[2].data.unshift({value:""});
      let hasData = function(dataset){
        for(let i=0;i<dataset.data.length;i++){
          if(dataset.data[i] && dataset.data[i].value && !isNaN(dataset.data[i].value) && parseFloat(dataset.data[i].value) !== 0)
            return true;
        }
        return false;
      }
      for(let i=chartObj.dataSource.dataset.length-1;i>=0;i--){
        if(!hasData(chartObj.dataSource.dataset[i])){
          chartObj.dataSource.dataset.splice(i,1)
        }
      }
      if(true || $("#chartContainer").children('img').length)
        $("#chartContainer").insertFusionCharts(chartObj);
      else
        $("#chartContainer").updateFusionCharts($.extend({},{dataFormat:chartObj.dataFormat,dataSource:chartObj.dataSource}));
      $('#chartCard').find('.dimmer').removeClass('active');
      if(callback && typeof callback === 'function') callback();
    });
  }

  function createLine(request, result, callback){
    require(['jquery', 'jquery-fusioncharts', 'fusioncharts', 'fusioncharts-theme', 'fusioncharts-timeseries'], function ($, jqfc, FusionCharts, FusionChartsTheme, TimeSeries) {
      let dob = new Date(request.user.dateOfBirth),
        age = dateDiff(dob)[0],
        retAge = dateDiff(dob,new Date(request.forecastOptions.retirementDate))[0],
        pcRange = Math.max(Math.abs(result.results[0].percentile-50),Math.abs(result.results[result.results.length-1].percentile-50));

      let chartObj = {
        type: 'mscombi2d',
        renderAt: 'container',
        width: '100%',
        height: '500',
        dataFormat: 'json',
        dataSource: {
          chart: {
            caption: "Percentiles graph ("+result.results[0].percentile+"%"+(result.results.length>1?" - "+result.results[result.results.length-1].percentile+"%":"")+")",
            drawcrossline: "0",
            yaxisname: "Amount (in GBP)",
            xaxisname: "Age (in years)",
            //syaxisname: "Number of employees",
            showvalues: "0",
            showanchors: "0",
            showLegend: "0",
            numberprefix: "£",
            //plothighlighteffect: "fadeout",
            plottooltext: "$seriesName at age $label is <b>$dataValue</b>",
            theme: "fusion"
          },
          categories: [{
            category: new Array(result.results[0].terms.length).fill().map((zero, i) => {
              return {
                label: (age+1+result.results[0].terms[i].term).toString()
              }
            }).filter((cat,i)=>parseInt(cat.label)<100) //max age = 99
          }],
          dataset: result.results.map((res,i)=>{
            return {
              seriesname: res.percentile+"th percentile",
              renderas: "line",
              color: "#5d62b5",
              alpha: 100-95*Math.pow(Math.abs(res.percentile-50)/pcRange,1/4),
              data: res.terms.map((proj,i)=>{
                return {value: proj.value || proj.value===0 ? proj.value : null};
              })
            }
          })
        }
      }
      chartObj.dataSource.categories[0].category.splice(retAge-age, 0, {
        //Setting data as vline data
        "vLine": "1",
        //Adding label
        "label": "Retire",
        //"color": "#29C3BE",
        "linePosition": 0
      })

      if(true || $("#chartContainer").children('img').length)
        $("#chartContainer").insertFusionCharts(chartObj);
      else
        $("#chartContainer").updateFusionCharts($.extend({},{dataFormat:chartObj.dataFormat,dataSource:chartObj.dataSource}));
      $('#chartCard').find('.dimmer').removeClass('active');
      if(callback && typeof callback === 'function') callback();
    });
  }

  $('#chartCard').find('.dimmer').removeClass('active');
});