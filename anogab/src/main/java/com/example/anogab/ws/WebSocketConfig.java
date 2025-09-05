package com.example.anogab.ws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Bean
    public ChatHandler chatHandler() {
        return new ChatHandler(); // 1-on-1
    }

    @Bean
    public ChatRoomHandler chatRoomHandler() {
        return new ChatRoomHandler(); // group rooms
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler(), "/chat")
                .setAllowedOrigins("*"); // random 1-on-1
        registry.addHandler(chatRoomHandler(), "/room")
                .setAllowedOrigins("*"); // group chat by roomId
    }
}
