package com.ivanov.portfolio_final.translation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/translations")
@CrossOrigin(origins = "http://localhost:5173")
public class TranslationController {

    @Autowired
    private MessageSource messageSource;

    @GetMapping
    public Map<String, Object> getTranslations(@RequestParam(defaultValue = "en") String lang) {
        Locale locale = new Locale(lang);
        Map<String, Object> translations = new HashMap<>();

        // List of translation keys
        String[] keys = {

                //Auth
                "login", "logout", "loggedAsAdmin",

                //Home Page
                "title", "description", "downloadCV",
                "cvEnglish", "cvFrench", "leaveReview",

                //NAVBAR
                "home", "about", "projects", "skills", "contact", "reviews",

                // About Page
                "aboutTitle", "languagesTitle", "noLanguages", "aboutDescription",
                "updateButton", "addLanguageButton", "deleteButton", "cancelButton",
                "updateTitle", "newProfilePictureLabel", "descriptionLabel",
                "addLanguageTitle", "languageNameLabel", "flagUrlLabel",
                "confirmDeleteTitle", "confirmDeleteMessage", "deleteSuccessMessage",
                "errorParsingFlags", "errorFetchingAboutData", "errorUpdatingAbout",
                "errorAddingLanguage", "errorDeletingLanguage", "errorParsingFlagsResponse",
                "errorLanguageExists", "errorInvalidLanguageData", "httpError",
                "aboutUpdatedSuccess", "languageAddedSuccess",

                // Contact Page
                "contactTitle", "infoTitle", "email", "linkedin",
                "formName", "formEmail", "formSubject", "formMessage",
                "formSend", "formSending", "formSuccess", "formError", "formFailure",

                // Reviews Page
                "reviewsTitle", "leaveReviewPage", "submitReview", "submitting", "reviewListTitle",
                "rating", "name", "message", "namePlaceholder", "messagePlaceholder", "noReviews",
                "reviewSuccess", "reviewError", "reviewFailure", "emptyFields",
                "deleteReview", "confirmDelete", "deleteSuccess", "yesDelete", "cancel",

                // Skills Page
                "skillsTitle", "addSkill", "updateSkill", "deleteSkill", "selectCategory",
                "selectSkillToUpdate", "selectSkillToDelete", "newSkillName",
                "confirmSkillDelete", "deleteSkillSuccess", "addSuccess", "updateSuccess",
                "addFailure", "updateFailure", "deleteFailure", "emptySkillFields",
                "yesDeleteSkill", "cancelSkill", "languagesSkill", "frameworks", "tools", "databases", "methodologies",
                "saveSkill", "selectSkill",

                // Login Page
                "loginTitle", "loginUsername", "loginPassword", "loginButton", "loginError", "invalidCredentials",

                // Logout Page
                "logoutTitle", "logoutMessage",

                // Projects Page
                "projectsTitle", "addNewProject", "viewDetails", "githubProject", "deploymentProject",
                "updateProject", "deleteProject", "confirmDeleteProject", "deleteProjectSuccess",
                "deleteProjectFailure", "fetchProjectsError", "createProjectTitle",
                "updateProjectTitle", "projectDetailsTitle", "confirmDeleteTitleProject",
                "projectName", "projectDescription", "projectTechnologies", "projectGithubLink",
                "projectUploadImage", "saveProject", "cancelProject", "yesDeleteProject", "close",
                "clientBilling", "petClinic", "sneakerEcommerceWS", "sneakerEcommerce",
                "shootingGame", "resumeBuilder","clientBillingDescription","petClinicDescription","sneakerEcommerceWSDescription",
                "sneakerEcommerceDescription","shootingGameDescription","resumeBuilderDescription"

        };

        for (String key : keys) {
            try {
                String message = messageSource.getMessage(key, null, locale);
                translations.put(key, message);
            } catch (Exception e) {
                translations.put(key, "MISSING: " + key);
            }
        }


        Map<String, String> languages = new HashMap<>();
        String[] languageKeys = { "English", "French", "Bulgarian" };

        for (String languageKey : languageKeys) {
            try {
                languages.put(languageKey, messageSource.getMessage("languages." + languageKey, null, locale));
            } catch (Exception e) {
                languages.put(languageKey, "MISSING: " + languageKey);
            }
        }

        translations.put("languages", languages);

        return translations;
    }
}