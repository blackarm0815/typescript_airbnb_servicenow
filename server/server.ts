interface Hardware {
  displayName: string | null;
  installStatus: number | null;
  sysUpdatedOn: number | null;
  trustRate: number | null;
}
const checkFloat = (
  testVariable: any,
) => {
  if (typeof testVariable === 'string') {
    if (!Number.isNaN(parseFloat(testVariable))) {
      return parseFloat(testVariable);
    }
  }
  return null;
};
const checkInteger = (
  testVariable: any,
) => {
  if (typeof testVariable === 'string') {
    if (!Number.isNaN(parseInt(testVariable, 10))) {
      return parseInt(testVariable, 10);
    }
  }
  return null;
};
const checkString = (
  testVariable: any,
) => {
  if (typeof testVariable === 'string') {
    if (testVariable !== '') {
      return testVariable;
    }
  }
  return null;
};
const checkTime = (
  testVariable: any,
) => {
  // @ts-ignore
  const tempTime: number | null = new GlideDateTime(testVariable).getNumericValue();
  if (tempTime !== 0) {
    // @ts-ignore
    return tempTime;
  }
  return null;
};
const getHardware = (
  rackSysId: string,
) => {
  const foundHardware: Record<string, Hardware> = {};
  // @ts-ignore
  const grHardware = new GlideRecord('alm_hardware');
  grHardware.addQuery('u_rack.sys_id', rackSysId);
  grHardware.query();
  while (grHardware.next()) {
    const hardwareSysId = checkString(grHardware.getUniqueValue());
    if (hardwareSysId !== null) {
      foundHardware[hardwareSysId] = {
        displayName: checkString(grHardware.display_name.getValue()),
        installStatus: checkInteger(grHardware.install_status.getValue()),
        sysUpdatedOn: checkTime(grHardware.sys_updated_on.getValue()),
        trustRate: checkFloat(grHardware.u_trust_rate.getValue()),
      };
    }
  }
  // return to client side
  // @ts-ignore
  data.foundHardware = foundHardware;
};
// @ts-ignore
if (input && input.getAlmHardware) {
  // @ts-ignore
  const testRackSysId: string | undefined = input.rackSysId;
  if (testRackSysId !== undefined) {
    getHardware(testRackSysId);
  }
}
