package com.ivanov.portfolio_final.skills.presentationlayer;

import com.ivanov.portfolio_final.skills.businesslayer.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    private SkillService skillService;

    public SkillController(SkillService skillService) {

        this.skillService=skillService;
    }

    @GetMapping()
    public ResponseEntity<List<SkillResponseDTO>> getSkills(){

        return ResponseEntity.status(HttpStatus.OK).body(skillService.getAllSkills());
    }

    @GetMapping("/{skillId}")
    public ResponseEntity<SkillResponseDTO> getSkillBySkillID(@PathVariable String skillId){

        return ResponseEntity.status(HttpStatus.OK).body(skillService.getSkillBySkillID(skillId));
    }

    @PostMapping()
    public ResponseEntity<SkillResponseDTO> addSkill(@RequestBody SkillRequestDTO skillRequestDTO) {

        return ResponseEntity.status(HttpStatus.CREATED).body(skillService.addSkill(skillRequestDTO));
    }

    @PutMapping("/{skillId}")
    public ResponseEntity<SkillResponseDTO> updateSkill(@RequestBody SkillRequestDTO skillRequestDTO,
                                                            @PathVariable String skillId){
        try{
            SkillResponseDTO updateSkill = skillService.updateSkill(skillRequestDTO,skillId);
            return ResponseEntity.status(HttpStatus.OK).body(updateSkill);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }
    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> deleteSkill(@PathVariable String skillId){

        skillService.deleteSkill(skillId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

    }
}
