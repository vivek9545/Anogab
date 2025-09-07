//package com.example.anogab.ws;
//
//import org.springframework.web.socket.*;
//import org.springframework.web.socket.handler.TextWebSocketHandler;
//
//import java.io.IOException;
//import java.util.*;
//import java.util.concurrent.*;
//
//public class ChatHandler extends TextWebSocketHandler {
//
//    // Track all connected users
//    private final Set<WebSocketSession> allSessions = ConcurrentHashMap.newKeySet();
//
//    // Queue of users waiting for a partner
//    private final Queue<WebSocketSession> waitingQueue = new ConcurrentLinkedQueue<>();
//
//    // sessionId -> partner session
//    private final Map<String, WebSocketSession> partners = new ConcurrentHashMap<>();
//
//    // Heartbeat: sessionId -> last pong timestamp
//    private final Map<String, Long> lastPong = new ConcurrentHashMap<>();
//
//    // Scheduler for ping task
//    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
//
//    public ChatHandler() {
//        // Send ping every 10s, drop if no pong within 30s
//        scheduler.scheduleAtFixedRate(this::heartbeatCheck, 10, 10, TimeUnit.SECONDS);
//    }
//
//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) {
//        allSessions.add(session);
//        lastPong.put(session.getId(), System.currentTimeMillis());
//        log("Connected: " + session.getId());
//        broadcastOnlineCount();
//    }
//
//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        String payload = message.getPayload();
//
//        switch (payload) {
//            case "FIND" -> findPartner(session);
//            case "NEXT" -> {
//                unpair(session);
//                findPartner(session);
//            }
//            case "END" -> unpair(session);
//            case "PONG" -> lastPong.put(session.getId(), System.currentTimeMillis());
//            default -> relayMessage(session, payload);
//        }
//    }
//
//    private void findPartner(WebSocketSession session) throws IOException {
//        // Avoid duplicates in queue
//        waitingQueue.remove(session);
//
//        WebSocketSession partner = waitingQueue.poll();
//        if (partner != null && partner.isOpen()) {
//            partners.put(session.getId(), partner);
//            partners.put(partner.getId(), session);
//
//            sendSafe(session, "PAIRED");
//            sendSafe(partner, "PAIRED");
//        } else {
//            waitingQueue.add(session);
//            sendSafe(session, "WAITING");
//        }
//    }
//
//    private void relayMessage(WebSocketSession sender, String msg) throws IOException {
//        WebSocketSession partner = partners.get(sender.getId());
//        if (partner != null && partner.isOpen()) {
//            String safe = msg.length() > 2000 ? msg.substring(0, 2000) : msg;
//            sendSafe(partner, safe);
//        } else {
//            sendSafe(sender, "SYSTEM: You are not paired. Click Start.");
//        }
//    }
//
//    private void unpair(WebSocketSession session) throws IOException {
//        WebSocketSession partner = partners.remove(session.getId());
//        if (partner != null) {
//            partners.remove(partner.getId());
//            sendSafe(partner, "PARTNER_LEFT");
//        }
//        waitingQueue.remove(session);
//        lastPong.remove(session.getId());
//    }
//
//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//        unpair(session);
//        allSessions.remove(session);
//        broadcastOnlineCount();
//        log("Disconnected: " + session.getId());
//    }
//
//    private void broadcastOnlineCount() {
//        String msg = "ONLINE_COUNT:" + allSessions.size();
//        for (WebSocketSession s : allSessions) {
//            sendSafe(s, msg);
//        }
//    }
//
//    private void sendSafe(WebSocketSession s, String text) {
//        try {
//            if (s != null && s.isOpen()) {
//                s.sendMessage(new TextMessage(text));
//            }
//        } catch (IOException ignored) {
//        }
//    }
//
//    // 🔹 Heartbeat logic
//    private void heartbeatCheck() {
//        long now = System.currentTimeMillis();
//        for (WebSocketSession s : allSessions) {
//            Long last = lastPong.get(s.getId());
//            if (last == null || (now - last) > 30_000) { // >30s no pong
//                log("Session timed out: " + s.getId());
//                try {
//                    s.close(CloseStatus.GOING_AWAY);
//                } catch (IOException ignored) {
//                }
//                allSessions.remove(s);
//                partners.remove(s.getId());
//                waitingQueue.remove(s);
//                lastPong.remove(s.getId());
//                broadcastOnlineCount();
//            } else {
//                // Ask client to respond
//                sendSafe(s, "PING");
//            }
//        }
//    }
//
//    private void log(String msg) {
//        System.out.println("[Chat] " + msg);
//    }
//}


package com.example.anogab.ws;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.*;

public class ChatHandler extends TextWebSocketHandler {

    // Track all connected users
    private final Set<WebSocketSession> allSessions = ConcurrentHashMap.newKeySet();

    // Queue of users waiting for a partner
    private final Queue<WebSocketSession> waitingQueue = new ConcurrentLinkedQueue<>();

    // sessionId -> partner session
    private final Map<String, WebSocketSession> partners = new ConcurrentHashMap<>();

    // Heartbeat: sessionId -> last pong timestamp
    private final Map<String, Long> lastPong = new ConcurrentHashMap<>();

    // Scheduler for ping task
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    public ChatHandler() {
        // Send ping every 10s, drop if no pong within 30s
        scheduler.scheduleAtFixedRate(this::heartbeatCheck, 10, 10, TimeUnit.SECONDS);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        allSessions.add(session);
        lastPong.put(session.getId(), System.currentTimeMillis());
        log("Connected: " + session.getId());
        broadcastOnlineCount();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();

        switch (payload) {
            case "FIND" -> findPartner(session);
            case "NEXT" -> {
                unpair(session);
                findPartner(session);
            }
            case "END" -> unpair(session);
            case "PONG" -> lastPong.put(session.getId(), System.currentTimeMillis());
            default -> relayMessage(session, payload);
        }
    }

    private void findPartner(WebSocketSession session) throws IOException {
        // Avoid duplicates in queue
        waitingQueue.remove(session);

        WebSocketSession partner = waitingQueue.poll();
        if (partner != null && partner.isOpen()) {
            partners.put(session.getId(), partner);
            partners.put(partner.getId(), session);

            sendSafe(session, "PAIRED");
            sendSafe(partner, "PAIRED");
        } else {
            waitingQueue.add(session);
            sendSafe(session, "WAITING");
        }
    }

    private void relayMessage(WebSocketSession sender, String msg) throws IOException {
        WebSocketSession partner = partners.get(sender.getId());
        if (partner != null && partner.isOpen()) {
            String safe = msg.length() > 2000 ? msg.substring(0, 2000) : msg;
            sendSafe(partner, safe);
        } else {
            sendSafe(sender, "SYSTEM: You are not paired. Click Start.");
        }
    }

    private void unpair(WebSocketSession session) throws IOException {
        WebSocketSession partner = partners.remove(session.getId());
        if (partner != null) {
            partners.remove(partner.getId());
            sendSafe(partner, "PARTNER_LEFT");
        }
        waitingQueue.remove(session);
        lastPong.remove(session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        unpair(session);
        allSessions.remove(session);
        broadcastOnlineCount();
        log("Disconnected: " + session.getId());
    }

    private void broadcastOnlineCount() {
        String msg = "ONLINE_COUNT:" + allSessions.size();
        for (WebSocketSession s : allSessions) {
            sendSafe(s, msg);
        }

        // Optional: Debug logging
        System.out.println("Online sessions: " + allSessions.size());
        allSessions.forEach(s -> System.out.println(" - " + s.getId() + " | open=" + s.isOpen()));
    }

    private void sendSafe(WebSocketSession s, String text) {
        try {
            if (s != null && s.isOpen()) {
                s.sendMessage(new TextMessage(text));
            }
        } catch (IOException ignored) {
        }
    }

    // 🔹 Heartbeat logic
    private void heartbeatCheck() {
        long now = System.currentTimeMillis();
        boolean changed = false;

        Iterator<WebSocketSession> iterator = allSessions.iterator();
        while (iterator.hasNext()) {
            WebSocketSession s = iterator.next();
            Long last = lastPong.get(s.getId());

            if (last == null || (now - last) > 30_000) { // >30s no pong
                log("Session timed out: " + s.getId());
                try {
                    s.close(CloseStatus.GOING_AWAY);
                } catch (IOException ignored) {}

                iterator.remove(); // ✅ safely remove from allSessions
                partners.remove(s.getId());
                waitingQueue.remove(s);
                lastPong.remove(s.getId());
                changed = true;
            } else {
                // Ask client to respond
                sendSafe(s, "PING");
            }
        }

        // Only broadcast if any session was removed
        if (changed) broadcastOnlineCount();
    }

    private void log(String msg) {
        System.out.println("[Chat] " + msg);
    }
}
