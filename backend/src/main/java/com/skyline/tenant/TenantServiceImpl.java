package com.skyline.tenant;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TenantServiceImpl implements TenantService{

    private final TenantRepository tenantRepository;

    public TenantServiceImpl(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @Override
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    @Override
    public Tenant getTenantById(Long id) {
        return tenantRepository.findById(id).orElseThrow(() -> new RuntimeException("Tenant not found"));
    }

    @Override
    public Tenant saveTenant(Tenant tenant) {
        return tenantRepository.save(tenant);
    }

    @Override
    public Tenant updateTenant(Long id, Tenant tenant) {
        Tenant existingTenant = tenantRepository.findById(id).orElseThrow(() -> new RuntimeException("Tenant not found"));

        existingTenant.setFirstName(tenant.getFirstName());
        existingTenant.setLastName(tenant.getLastName());
        existingTenant.setEmail(tenant.getEmail());
        existingTenant.setPhone(tenant.getPhone());

        return tenantRepository.save(existingTenant);
    }

    @Override
    public void deleteTenant(Long id) {
        if(!tenantRepository.existsById(id)){
            throw new RuntimeException("Tenant not found");
        }
        tenantRepository.deleteById(id);
    }


}
