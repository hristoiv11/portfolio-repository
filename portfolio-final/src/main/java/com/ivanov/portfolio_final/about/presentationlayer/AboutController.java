package com.ivanov.portfolio_final.about.presentationlayer;

import com.ivanov.portfolio_final.about.businesslayer.AboutService;
import com.ivanov.portfolio_final.about.dataaccesslayer.About;
import com.ivanov.portfolio_final.projects.businesslayer.ProjectService;
import com.ivanov.portfolio_final.projects.dataaccesslayer.Project;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectRequestDTO;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectResponseDTO;
import com.ivanov.portfolio_final.utils.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/about")
@CrossOrigin(origins = "http://localhost:5173")
public class AboutController {

    private AboutService aboutService;

    public AboutController(AboutService aboutService) {

        this.aboutService=aboutService;
    }

    @GetMapping()
    public ResponseEntity<List<AboutResponseDTO>> getAbouts(){

        return ResponseEntity.status(HttpStatus.OK).body(aboutService.getAllAbouts());
    }

    @GetMapping("/{aboutId}")
    public ResponseEntity<AboutResponseDTO> getAboutByAboutID(@PathVariable String aboutId){

        return ResponseEntity.status(HttpStatus.OK).body(aboutService.getAboutByAboutID(aboutId));
    }

    @PostMapping()
    public ResponseEntity<AboutResponseDTO> addAbout(@RequestBody AboutRequestDTO aboutRequestDTO) {

        return ResponseEntity.status(HttpStatus.CREATED).body(aboutService.addAbout(aboutRequestDTO));
    }

    @PutMapping("/{aboutId}")
    public ResponseEntity<AboutResponseDTO> updateAbout(@RequestBody AboutRequestDTO aboutRequestDTO,
                                                            @PathVariable String aboutId){
        try{
            AboutResponseDTO updateAbout = aboutService.updateAbout(aboutRequestDTO,aboutId);
            return ResponseEntity.status(HttpStatus.OK).body(updateAbout);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }
    @DeleteMapping("/{aboutId}")
    public ResponseEntity<Void> deleteAbout(@PathVariable String aboutId){

        aboutService.deleteAbout(aboutId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

    }

    @DeleteMapping("/{aboutId}/languages/{languageName}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable String aboutId, @PathVariable String languageName) {
        aboutService.deleteLanguage(aboutId, languageName);
        return ResponseEntity.noContent().build(); // 204 No Content if deleted successfully
    }


    @GetMapping("/{aboutId}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable String aboutId) {
        About about = aboutService.getAboutImageByAboutID(aboutId); // Using the service layer for better encapsulation
        if (about == null || about.getImage() == null) {
            throw new NotFoundException("Image not found for aboutId: " + aboutId);
        }
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Adjust MIME type if needed
                .body(Base64.getDecoder().decode(about.getImage())); // If image is Base64 encoded, decode it
    }
}
