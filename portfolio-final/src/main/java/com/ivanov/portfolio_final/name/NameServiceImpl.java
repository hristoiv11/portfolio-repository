package com.ivanov.portfolio_final.name;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NameServiceImpl implements NameService{

    private final NameRepository nameRepository;

    public NameServiceImpl(NameRepository nameRepository) {
        this.nameRepository = nameRepository;
    }

    @Override
    public List<NameResponseDTO> getAllNames() {
        List<Name> names = nameRepository.findAll();

        List<NameResponseDTO> nameResponseDTOs = new ArrayList<>();
        for (Name name : names) {
            NameResponseDTO nameResponseDTO = new NameResponseDTO();
            BeanUtils.copyProperties(name, nameResponseDTO);
            nameResponseDTOs.add(nameResponseDTO);
        }

        return nameResponseDTOs;
    }
}
