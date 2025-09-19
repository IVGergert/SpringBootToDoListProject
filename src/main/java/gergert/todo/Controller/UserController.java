package gergert.todo.Controller;

import gergert.todo.Model.User;
import gergert.todo.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/profile/update/{id}")
    public String updateProfile(@ModelAttribute User user, RedirectAttributes redirectAttributes) {
        try {
            User updatedUser = userService.updateUser(user);

            Authentication newAuth = new UsernamePasswordAuthenticationToken(
                    updatedUser.getEmail(), updatedUser.getPassword(), List.of()
            );
            SecurityContextHolder.getContext().setAuthentication(newAuth);

            redirectAttributes.addFlashAttribute("profileUpdated", true);
            redirectAttributes.addFlashAttribute("openProfile", true);
            return "redirect:/tasks";
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("profileError", e.getMessage());
            redirectAttributes.addFlashAttribute("openProfile", true);
            return "redirect:/tasks";
        }
    }
}
