package com.resumebuilder.util;

public class SlugUtil {

    private SlugUtil() {
    }

    public static String toSlug(String text) {

        return text
                .trim()
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
    }
}