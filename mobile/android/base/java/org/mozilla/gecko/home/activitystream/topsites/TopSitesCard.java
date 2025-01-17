/* -*- Mode: Java; c-basic-offset: 4; tab-width: 20; indent-tabs-mode: nil; -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.mozilla.gecko.home.activitystream.topsites;

import android.database.Cursor;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import org.mozilla.gecko.R;
import org.mozilla.gecko.db.BrowserContract;
import org.mozilla.gecko.favicons.Favicons;
import org.mozilla.gecko.home.UpdateViewFaviconLoadedListener;
import org.mozilla.gecko.widget.FaviconView;

import java.util.EnumSet;

class TopSitesCard extends RecyclerView.ViewHolder {
    private final FaviconView faviconView;

    private final TextView title;
    private final View menuButton;

    private final UpdateViewFaviconLoadedListener mFaviconListener;

    private String url;

    private int mLoadFaviconJobId = Favicons.NOT_LOADING;

    public TopSitesCard(CardView card) {
        super(card);

        faviconView = (FaviconView) card.findViewById(R.id.favicon);

        title = (TextView) card.findViewById(R.id.title);
        menuButton = card.findViewById(R.id.menu);

        mFaviconListener = new UpdateViewFaviconLoadedListener(faviconView);
    }

    void bind(Cursor cursor) {
        this.url = cursor.getString(cursor.getColumnIndexOrThrow(BrowserContract.Combined.URL));

        title.setText(cursor.getString(cursor.getColumnIndexOrThrow(BrowserContract.Combined.TITLE)));

        Favicons.cancelFaviconLoad(mLoadFaviconJobId);

        mLoadFaviconJobId = Favicons.getSizedFaviconForPageFromLocal(faviconView.getContext(), url, mFaviconListener);
    }
}
