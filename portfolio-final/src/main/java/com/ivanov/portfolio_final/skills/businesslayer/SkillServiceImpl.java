package com.ivanov.portfolio_final.skills.businesslayer;

import com.ivanov.portfolio_final.skills.dataaccesslayer.Skill;
import com.ivanov.portfolio_final.skills.dataaccesslayer.SkillRepository;
import com.ivanov.portfolio_final.skills.presentationlayer.SkillRequestDTO;
import com.ivanov.portfolio_final.skills.presentationlayer.SkillResponseDTO;
import com.ivanov.portfolio_final.utils.exceptions.InUseException;
import com.ivanov.portfolio_final.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SkillServiceImpl implements SkillService{

    private SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository){

        this.skillRepository=skillRepository;
    }

    @Override
    public List<SkillResponseDTO> getAllSkills() {

        List<Skill> skillEntities = skillRepository.findAll();


        List<SkillResponseDTO> skillResponseDTOList = new ArrayList<>();

        for(Skill skill : skillEntities){
            SkillResponseDTO skillResponseDTO = new SkillResponseDTO();
            BeanUtils.copyProperties(skill, skillResponseDTO);

            skillResponseDTOList.add(skillResponseDTO);
        }

        return skillResponseDTOList;
    }

    @Override
    public SkillResponseDTO getSkillBySkillID(String skillId) {

        Skill skill = skillRepository.findSkillBySkillId(skillId);

        if(skill == null){
            throw new NotFoundException("Unknown skillId: " + skillId);
        }

        SkillResponseDTO skillResponseDTO = new SkillResponseDTO();
        BeanUtils.copyProperties(skill,skillResponseDTO);
        return skillResponseDTO;
    }

    @Override
    public SkillResponseDTO addSkill(SkillRequestDTO skillRequestDTO) {

        Skill skill = new Skill();
        BeanUtils.copyProperties(skillRequestDTO,skill);
        skill.setSkillId(UUID.randomUUID().toString());

        Skill savedSkill = skillRepository.save(skill);

        SkillResponseDTO skillResponseDTO = new SkillResponseDTO();
        BeanUtils.copyProperties(savedSkill,skillResponseDTO);

        return skillResponseDTO;
    }

    @Override
    public SkillResponseDTO updateSkill(SkillRequestDTO skillRequestDTO, String skillId) {

        Skill foundSkill = skillRepository.findSkillBySkillId(skillId);

        if(foundSkill == null){
            throw new NotFoundException("Unknown skillId: " + skillId);
        }

        Skill skill = new Skill();
        BeanUtils.copyProperties(skillRequestDTO,skill);

        skill.setSkillId(foundSkill.getSkillId());
        skill.setId(foundSkill.getId());

        Skill savedSkill = skillRepository.save(skill);

        SkillResponseDTO skillResponseDTO = new SkillResponseDTO();
        BeanUtils.copyProperties(savedSkill,skillResponseDTO);

        return skillResponseDTO;
    }

    @Override
    public void deleteSkill(String skillId) {
        Skill foundSkill = skillRepository.findSkillBySkillId(skillId);

        if(foundSkill == null){
            throw new NotFoundException("Unknown skillId: " + skillId);
        }

        try{
            skillRepository.delete(foundSkill);

        }catch(DataIntegrityViolationException ex){

            throw new InUseException("Cannot delete skill with skillId:" + skillId);

        }
    }
}
