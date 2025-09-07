package com.example.anogab.ws;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class ChatRoomHandler extends TextWebSocketHandler {

    // roomId -> set of sessions
    private final Map<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();

    private String getRoomId(WebSocketSession session) {
        URI uri = session.getUri();
        if (uri == null) return "default";
        String query = uri.getQuery();
        if (query == null) return "default";
        for (String p : query.split("&")) {
            String[] kv = p.split("=", 2);
            if (kv.length == 2 && kv[0].equals("roomId")) {
                return kv[1];
            }
        }
        return "default";
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String roomId = getRoomId(session);
        rooms.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(session);

        // ✅ Tell only this user they joined
        sendSafe(session, "SYSTEM: User joined room " + roomId);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        String roomId = getRoomId(session);
        Set<WebSocketSession> peers = rooms.getOrDefault(roomId, Set.of());

        for (WebSocketSession peer : peers) {
            if (peer.isOpen()) {
                if (peer.getId().equals(session.getId())) {
                    // ✅ Mark sender’s own message (so frontend ignores)
                    sendSafe(peer, "FROM_ME:" + message.getPayload());
                } else {
                    sendSafe(peer, message.getPayload());
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String roomId = getRoomId(session);
        Set<WebSocketSession> peers = rooms.get(roomId);
        if (peers != null) {
            peers.remove(session);
            if (peers.isEmpty()) {
                rooms.remove(roomId);
            }
        }
    }

    private void sendSafe(WebSocketSession s, String text) {
        try {
            if (s.isOpen()) {
                s.sendMessage(new TextMessage(text));
            }
        } catch (Exception ignored) {}
    }
}
