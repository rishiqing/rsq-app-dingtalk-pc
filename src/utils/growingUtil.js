export default {
  growingIoMethod (userData) {
    const _vds = []
    window._vds = _vds
    _vds.push(['setAccountId', '8282882b138aee34'])
    try {
      const userId = userData.id
      const companyId = userData.teamId || '个人'
      const userName = userData.realName
      const companyName = userData.team ? userData.team.name : '个人'
      const orgType = userData.team ? '企业' : '个人'
      let vipType
      if (userData.isMember) {
        vipType = '企业付费'
      } else if (userData.isPersonVIP) {
        vipType = '个人付费'
      } else {
        vipType = '普通'
      }
      _vds.push(['setCS1', 'user_id', userId])
      _vds.push(['setCS2', 'company_id', companyId])
      _vds.push(['setCS3', 'user_name', userName])
      _vds.push(['setCS4', 'company_name', companyName])
      _vds.push(['setCS5', 'personalOrCompany', orgType])
      _vds.push(['setCS6', 'isVip', vipType])
    } catch (e) {
      // pass
    }

    const vds = document.createElement('script')
    vds.type = 'text/javascript'
    vds.async = true
    vds.src = '//dn-growing.qbox.me/vds.js'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(vds, s)
    // var _vds = _vds || []
    // window._vds = _vds;
    // (function () {
    //   _vds.push(['setAccountId', '8282882b138aee34'])
    //   try {
    //     const userId = userData.id
    //     const companyId = userData.teamId || '个人'
    //     const userName = userData.realName
    //     const companyName = userData.team ? userData.team.name : '个人'
    //     const orgType = userData.team ? '企业' : '个人'
    //     let vipType
    //     if (userData.isMember) {
    //       vipType = '企业付费'
    //     } else if (userData.isPersonVIP) {
    //       vipType = '个人付费'
    //     } else {
    //       vipType = '普通'
    //     }
    //     _vds.push(['setCS1', 'user_id', userId])
    //     _vds.push(['setCS2', 'company_id', companyId])
    //     _vds.push(['setCS3', 'user_name', userName])
    //     _vds.push(['setCS4', 'company_name', companyName])
    //     _vds.push(['setCS5', 'personalOrCompany', orgType])
    //     _vds.push(['setCS6', 'isVip', vipType])
    //   } catch (e) {
    //     // pass
    //   }
    //   (function () {
    //     var vds = document.createElement('script')
    //     vds.type = 'text/javascript'
    //     vds.async = true
    //     vds.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js'
    //     var s = document.getElementsByTagName('script')[0]
    //     console.log(vds)
    //     s.parentNode.insertBefore(vds, s)
    //   })()
    // })()
  }
}
