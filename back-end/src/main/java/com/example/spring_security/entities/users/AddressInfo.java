package com.example.spring_security.entities.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressInfo {
    public enum AreaName {
        HOANG_MAI,
        LONG_BIEN,
        THANH_XUAN,
        BAC_TU_LIEM,
        BA_DINH,
        CAU_GIAY,
        DONG_DA,
        HAI_BA_TRUNG,
        HOAN_KIEM,
        TAY_HO,
        NAM_TU_LIEM,
        DAN_PHUONG,
        GIA_LAM,
        DONG_ANH,
        CHUONG_MY,
        HOAI_DUC,
        BA_VI,
        MY_DUC,
        PHUC_THO,
        THACH_THAT,
        QUOC_OAI,
        THANH_TRI,
        THUONG_TIN,
        THANH_OAI,
        PHU_XUYEN,
        ME_LINH,
        SOC_SON,
        UNG_HOA,
        SON_TAY,
    }

    @NotBlank(message = "address must not be blank")
    @Column(nullable = false)
    private String address;

    @NotNull(message = "area must not be null")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AreaName area;
}
