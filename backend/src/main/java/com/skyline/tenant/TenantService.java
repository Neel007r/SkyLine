package com.skyline.tenant;

import java.util.List;

public interface TenantService {

    List<Tenant> getAllTenants();

    Tenant getTenantById(Long id);

    Tenant saveTenant(Tenant tenant);

    Tenant updateTenant(Long id, Tenant tenant);

    void deleteTenant(Long id);


}
