function getInvoiceType() {
  return {
    'EAT': {
      value: 1,
      label: '餐饮'
    },
    'DRINK': {
      value: 2,
      label: '酒水'
    }
  }
}

export default {
  getInvoiceType,
  findEnumLabel(value, enums) {
    for (const key in enums) {
      const item = enums[key]
      if (item.value === value) {
        return item.label
      }
    }
    return ''
  }
}
